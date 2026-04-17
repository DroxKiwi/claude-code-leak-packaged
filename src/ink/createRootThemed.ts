import { type ReactNode, createElement } from 'react'
import { ThemeProvider } from '../components/design-system/ThemeProvider.js'
import { type RenderOptions, type Root, createRoot as inkCreateRoot } from './root.js'

export type { RenderOptions, Root }

/** Used by `src/ink.ts` `render()` — keep theme wrapping in one place. */
export function wrapWithThemeProvider(node: ReactNode): ReactNode {
	return createElement(ThemeProvider, null, node)
}

export async function createRoot(options?: RenderOptions): Promise<Root> {
	const root = await inkCreateRoot(options)
	return {
		...root,
		render: (node) => root.render(wrapWithThemeProvider(node)),
	}
}
