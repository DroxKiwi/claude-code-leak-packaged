import type { FileStateCache } from '../../utils/fileStateCache.js'

export type TipContext = {
	theme?: string
	bashTools?: Set<string>
	readFileState?: FileStateCache
} & Record<string, unknown>

export type Tip = {
	id: string
	content: (ctx?: TipContext) => Promise<string>
	cooldownSessions?: number
	isRelevant?: (ctx?: TipContext) => Promise<boolean>
}
