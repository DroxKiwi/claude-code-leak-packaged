import type { Progress } from './message.js'

export type ShellProgress = {
	type: string
	fullOutput: string
	output: string
	elapsedTimeSeconds: number
	totalLines: number
	[key: string]: unknown
}

export type BashProgress = ShellProgress & {
	command?: string
}

export type PowerShellProgress = ShellProgress & {
	command?: string
}

export type MCPProgress = Progress & Record<string, unknown>
export type AgentToolProgress = Progress & Record<string, unknown>
export type SdkWorkflowProgress = Progress & Record<string, unknown>
export type SkillToolProgress = Progress & Record<string, unknown>
export type WebSearchProgress = Progress & Record<string, unknown>
export type TaskOutputProgress = Progress & Record<string, unknown>

export type REPLToolProgress = Progress & Record<string, unknown>

export type ToolProgressData = Progress & Record<string, unknown>
