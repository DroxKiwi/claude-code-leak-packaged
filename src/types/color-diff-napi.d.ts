declare module 'color-diff-napi' {
	export type ColorFile = Record<string, unknown>
	export type SyntaxTheme = Record<string, unknown>

	export function getSyntaxTheme(name: string): SyntaxTheme
	export function ColorDiff(
		oldFile: ColorFile,
		newFile: ColorFile,
		theme: SyntaxTheme,
	): string
}
