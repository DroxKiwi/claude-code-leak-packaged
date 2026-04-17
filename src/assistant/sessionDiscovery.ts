export type AssistantSession = {
	id: string
	name?: string
	[key: string]: unknown
}

export async function discoverAssistantSessions(): Promise<AssistantSession[]> {
	return []
}
