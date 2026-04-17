type GeneratedAgentLike = {
	identifier: string
	whenToUse: string
	systemPrompt: string
}

type FinalAgentLike = {
	agentType: string
	whenToUse: string
	tools?: string[]
	color?: string
	model?: string
	memory?: string
	getSystemPrompt: () => string
}

export type AgentWizardData = {
	generationPrompt?: string
	isGenerating?: boolean
	wasGenerated?: boolean
	location?: string
	agentType?: string
	systemPrompt?: string
	whenToUse?: string
	selectedTools?: string[]
	generatedAgent?: GeneratedAgentLike
	finalAgent?: FinalAgentLike
	[key: string]: unknown
}
