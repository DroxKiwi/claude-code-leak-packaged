/**
 * Stub for Anthropic-internal @ant/claude-for-chrome-mcp (not on npm).
 * Enables startup without the real package; in-process Chrome MCP lists no tools.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'

export type PermissionMode = 'ask' | 'skip_all_permission_checks' | 'follow_a_plan'

export interface Logger {
	silly(message: string, ...args: unknown[]): void
	debug(message: string, ...args: unknown[]): void
	info(message: string, ...args: unknown[]): void
	warn(message: string, ...args: unknown[]): void
	error(message: string, ...args: unknown[]): void
}

/** Subset of fields used by createChromeContext — extra fields allowed. */
export type ClaudeForChromeContext = Record<string, unknown>

/** Tool names aligned with ChromeToolName in toolRendering.tsx / product prompts. */
export const BROWSER_TOOLS: ReadonlyArray<{ name: string }> = [
	{ name: 'javascript_tool' },
	{ name: 'read_page' },
	{ name: 'find' },
	{ name: 'form_input' },
	{ name: 'computer' },
	{ name: 'navigate' },
	{ name: 'resize_window' },
	{ name: 'gif_creator' },
	{ name: 'upload_image' },
	{ name: 'get_page_text' },
	{ name: 'tabs_context_mcp' },
	{ name: 'tabs_create_mcp' },
	{ name: 'update_plan' },
	{ name: 'read_console_messages' },
	{ name: 'read_network_requests' },
	{ name: 'shortcuts_list' },
	{ name: 'shortcuts_execute' },
]

export function createClaudeForChromeMcpServer(_context: ClaudeForChromeContext): Server {
	const server = new Server(
		{ name: 'claude-in-chrome-stub', version: '0.0.0-stub' },
		{ capabilities: { tools: {} } },
	)
	server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [] }))
	server.setRequestHandler(CallToolRequestSchema, async () => ({
		content: [
			{
				type: 'text',
				text: 'Claude-in-Chrome MCP stub: the real @ant/claude-for-chrome-mcp package is not bundled in this build.',
			},
		],
		isError: true,
	}))
	return server
}
