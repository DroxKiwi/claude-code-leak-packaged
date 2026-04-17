export const SNIP_NUDGE_TEXT =
	'Context efficiency mode is enabled. Continue normally while older context may be compacted.'

export function isSnipRuntimeEnabled(): boolean {
	return false
}

export function isSnipMarkerMessage(_message: unknown): boolean {
	return false
}

export function snipCompactIfNeeded<T>(messages: T[]): {
	messages: T[]
	tokensFreed: number
	boundaryMessage?: unknown
} {
	return {
		messages,
		tokensFreed: 0,
	}
}

export function shouldNudgeForSnips(_messages?: unknown): boolean {
	return false
}
