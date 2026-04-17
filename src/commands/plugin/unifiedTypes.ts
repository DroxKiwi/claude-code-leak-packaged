export type UnifiedInstalledItem = {
	kind?: 'plugin' | 'mcp'
	id: string
	name: string
	description?: string
	[key: string]: unknown
}
