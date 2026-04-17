/**
 * Runtime / non-serializable SDK surface — missing from the leaked tree; minimal
 * definitions so the CLI and typecheck resolve (SDK stubs throw at runtime).
 */
import type { z } from 'zod'
import type { SDKMessage, SDKResultMessage } from './coreTypes.js'

export type EffortLevel = 'low' | 'medium' | 'high' | 'max'

export type AnyZodRawShape = Record<string, z.ZodTypeAny>

export type InferShape<S extends AnyZodRawShape> = {
	[k in keyof S]: z.infer<S[k]>
}

export type SdkMcpToolDefinition<Schema extends AnyZodRawShape> = {
	name: string
	description: string
	inputSchema: Schema
	handler: (
		args: InferShape<Schema>,
		extra: unknown,
	) => Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult>
	annotations?: import('@modelcontextprotocol/sdk/types.js').ToolAnnotations
	searchHint?: string
	alwaysLoad?: boolean
}

export type McpSdkServerConfigWithInstance = {
	name: string
	version?: string
	instance: unknown
}

export type ListSessionsOptions = {
	dir?: string
	limit?: number
	offset?: number
}

export type GetSessionInfoOptions = { dir?: string }

export type GetSessionMessagesOptions = {
	dir?: string
	limit?: number
	offset?: number
	includeSystemMessages?: boolean
}

export type SessionMutationOptions = { dir?: string }

export type ForkSessionOptions = {
	dir?: string
	upToMessageId?: string
	title?: string
}

export type ForkSessionResult = { sessionId: string }

export type SDKSessionOptions = Record<string, unknown>

export interface SDKSession {
	readonly sessionId: string
	prompt(message: string): Promise<SDKResultMessage>
	close(): Promise<void>
}

export type SessionMessage = SDKMessage

export type Options = Record<string, unknown>
export type InternalOptions = Record<string, unknown>

/** Placeholder async iterable shape for `query()` (real impl is in-app). */
export type Query = AsyncIterable<SDKResultMessage> & {
	sessionId?: string
}

export type InternalQuery = Query
