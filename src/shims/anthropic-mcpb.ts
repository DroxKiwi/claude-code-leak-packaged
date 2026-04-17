/**
 * Stand-in for @anthropic-ai/mcpb (internal Anthropic package).
 * Types + manifest validation (Zod v3) + MCP server config from DXT/MCPB manifests.
 */
import { z } from 'zod'

import type { McpServerConfig } from '../services/mcp/types.js'
import type { SystemDirectories } from '../utils/systemDirectories.js'

export type McpbUserConfigurationOption = {
	type: 'string' | 'number' | 'boolean' | 'directory' | 'file'
	title: string
	description: string
	required?: boolean
	default?: string | number | boolean | string[]
	multiple?: boolean
	sensitive?: boolean
	min?: number
	max?: number
}

const McpbUserConfigurationOptionSchema: z.ZodType<McpbUserConfigurationOption> = z.object({
	type: z.enum(['string', 'number', 'boolean', 'directory', 'file']),
	title: z.string(),
	description: z.string(),
	required: z.boolean().optional(),
	default: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]).optional(),
	multiple: z.boolean().optional(),
	sensitive: z.boolean().optional(),
	min: z.number().optional(),
	max: z.number().optional(),
})

export const McpbManifestSchema = z
	.object({
		name: z.string(),
		version: z.string(),
		author: z.object({ name: z.string() }),
		server: z.unknown().optional(),
		user_config: z.record(z.string(), McpbUserConfigurationOptionSchema).optional(),
	})
	.passthrough()

export type McpbManifest = z.infer<typeof McpbManifestSchema>

export type GetMcpConfigForManifestInput = {
	manifest: McpbManifest
	extensionPath: string
	systemDirs: SystemDirectories
	userConfig: Record<string, string | number | boolean | string[]>
	pathSeparator: string
}

function normalizePathForPlatform(p: string, pathSeparator: string): string {
	if (pathSeparator === '\\') {
		return p.replace(/\//g, '\\')
	}
	return p
}

function substituteManifestStrings(
	value: string,
	ctx: {
		extensionPath: string
		systemDirs: SystemDirectories
		userConfig: GetMcpConfigForManifestInput['userConfig']
		pathSeparator: string
	},
): string {
	const root = normalizePathForPlatform(ctx.extensionPath, ctx.pathSeparator)
	let out = value.replace(/\$\{CLAUDE_PLUGIN_ROOT\}/g, () => root)

	out = out.replace(/\$\{user_config\.([^}]+)\}/g, (_m, key: string) => {
		const raw = ctx.userConfig[key]
		if (raw === undefined) {
			throw new Error(`Missing user_config.${key} for MCPB manifest substitution`)
		}
		if (Array.isArray(raw)) {
			return raw.map(String).join(',')
		}
		return String(raw)
	})

	for (const [dirKey, dirPath] of Object.entries(ctx.systemDirs)) {
		out = out.replace(new RegExp(`\\$\\{${dirKey}\\}`, 'g'), () => dirPath)
	}

	return out
}

function deepSubstitute(
	value: unknown,
	ctx: Parameters<typeof substituteManifestStrings>[1],
): unknown {
	if (typeof value === 'string') {
		return substituteManifestStrings(value, ctx)
	}
	if (Array.isArray(value)) {
		return value.map((v) => deepSubstitute(v, ctx))
	}
	if (value !== null && typeof value === 'object') {
		const o = value as Record<string, unknown>
		const next: Record<string, unknown> = {}
		for (const [k, v] of Object.entries(o)) {
			next[k] = deepSubstitute(v, ctx)
		}
		return next
	}
	return value
}

function asStringRecord(o: unknown): Record<string, string> | undefined {
	if (o === null || o === undefined || typeof o !== 'object' || Array.isArray(o)) {
		return undefined
	}
	const out: Record<string, string> = {}
	for (const [k, v] of Object.entries(o)) {
		if (typeof v === 'string') {
			out[k] = v
		}
	}
	return Object.keys(out).length > 0 ? out : undefined
}

type UrlTransport = 'sse' | 'http' | 'ws'

function mcpUrlTransportConfig(
	transport: UrlTransport,
	server: Record<string, unknown>,
	url: string,
): McpServerConfig {
	const headers = asStringRecord(server.headers)
	const headersHelper = typeof server.headersHelper === 'string' ? server.headersHelper : undefined
	return {
		type: transport,
		url,
		...(headers ? { headers } : {}),
		...(headersHelper ? { headersHelper } : {}),
	}
}

function parseStdioEnv(server: Record<string, unknown>): Record<string, string> | undefined {
	const raw = server.env
	if (raw === null || raw === undefined || typeof raw !== 'object' || Array.isArray(raw)) {
		return undefined
	}
	const env: Record<string, string> = {}
	for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
		env[k] = typeof v === 'string' ? v : String(v)
	}
	return Object.keys(env).length > 0 ? env : undefined
}

function stdioConfigFromServer(server: Record<string, unknown>): McpServerConfig | null {
	const command = server.command
	if (typeof command !== 'string' || !command) {
		return null
	}
	const args = Array.isArray(server.args) ? server.args.map((a) => String(a)) : []
	const env = parseStdioEnv(server)
	return {
		type: 'stdio',
		command,
		args,
		...(env ? { env } : {}),
	}
}

function serverObjectToMcpConfig(server: Record<string, unknown>): McpServerConfig | null {
	const t = server.type as string | undefined
	const url = typeof server.url === 'string' && server.url ? server.url : null

	if (t === 'http' || t === 'ws' || t === 'sse') {
		if (!url) return null
		return mcpUrlTransportConfig(t, server, url)
	}

	if (!server.command && url) {
		return mcpUrlTransportConfig('sse', server, url)
	}

	return stdioConfigFromServer(server)
}

/**
 * Builds {@link McpServerConfig} from a parsed DXT/MCPB manifest after
 * expanding `${CLAUDE_PLUGIN_ROOT}`, `${user_config.*}`, and known
 * `${HOME}`/`${DESKTOP}`/`${DOCUMENTS}`/`${DOWNLOADS}` placeholders.
 */
export async function getMcpConfigForManifest(
	input: GetMcpConfigForManifestInput,
): Promise<McpServerConfig | null> {
	const raw = input.manifest.server
	if (raw === null || raw === undefined || typeof raw !== 'object') {
		return null
	}

	const ctx = {
		extensionPath: input.extensionPath,
		systemDirs: input.systemDirs,
		userConfig: input.userConfig,
		pathSeparator: input.pathSeparator,
	}

	const substituted = deepSubstitute(raw, ctx) as Record<string, unknown>
	return serverObjectToMcpConfig(substituted)
}
