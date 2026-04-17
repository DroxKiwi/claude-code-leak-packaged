export type LspServerState = 'stopped' | 'starting' | 'running' | 'stopping' | 'error'

export type ScopedLspServerConfig = {
	command?: string
	args?: string[]
	env?: Record<string, string>
	workspaceFolder?: string
	initializationOptions?: unknown
	maxRestarts?: number
	startupTimeout?: number
	extensionToLanguage?: Record<string, string>
	restartOnCrash?: boolean
	shutdownTimeout?: number
	scope?: 'dynamic' | 'static'
	source?: string
}

export type LspServerConfig = ScopedLspServerConfig
