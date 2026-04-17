export type ServerInfo = {
	name: string
	type: string
	description?: string
	[key: string]: unknown
}

export type AgentMcpServerInfo = ServerInfo & {
	agentId?: string
}

export type StdioServerInfo = ServerInfo & {
	type: 'stdio'
	command?: string
	args?: string[]
}

export type SSEServerInfo = ServerInfo & {
	type: 'sse'
	url?: string
}

export type HTTPServerInfo = ServerInfo & {
	type: 'http'
	url?: string
}

export type ClaudeAIServerInfo = ServerInfo & {
	type: 'claudeai'
}

export type MCPViewState =
	| 'list'
	| 'detail'
	| 'tools'
	| {
			type: string
			[key: string]: unknown
	  }
