import type { ToolUseContext } from '../../Tool.js'
import type { Message } from '../../types/message.js'

type CollapseHealth = {
	totalSpawns: number
	totalEmptySpawns: number
	totalErrors: number
	lastError?: string
	emptySpawnWarningEmitted: boolean
}

type CollapseStats = {
	collapsedSpans: number
	collapsedMessages: number
	stagedSpans: number
	health: CollapseHealth
}

const EMPTY_STATS: CollapseStats = {
	collapsedSpans: 0,
	collapsedMessages: 0,
	stagedSpans: 0,
	health: {
		totalSpawns: 0,
		totalEmptySpawns: 0,
		totalErrors: 0,
		emptySpawnWarningEmitted: false,
	},
}

export function isContextCollapseEnabled(): boolean {
	return false
}

export function getStats(): CollapseStats {
	return EMPTY_STATS
}

export function subscribe(_listener: () => void): () => void {
	return () => {}
}

export function resetContextCollapse(): void {}
export function initContextCollapse(): void {}

export async function applyCollapsesIfNeeded(
	messages: Message[],
	_toolUseContext: ToolUseContext,
	_querySource: unknown,
): Promise<{ messages: Message[] }> {
	return { messages }
}

export function recoverFromOverflow(
	messages: Message[],
	_querySource: unknown,
): { messages: Message[]; committed: number } {
	return { messages, committed: 0 }
}

export function isWithheldPromptTooLong(_message: unknown): boolean {
	return false
}
