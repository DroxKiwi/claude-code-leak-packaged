import type { SystemTheme } from './systemTheme.js'

export function watchSystemTheme(
	_internalQuerier: unknown,
	onTheme: (theme: SystemTheme) => void,
): () => void {
	// Fallback watcher for terminal-only fork: emit current dark theme once.
	onTheme('dark')
	return () => {}
}
