declare module 'cli-highlight' {
	export function highlight(code: string, options?: Record<string, unknown>): string
	export function supportsLanguage(lang: string): boolean
}
