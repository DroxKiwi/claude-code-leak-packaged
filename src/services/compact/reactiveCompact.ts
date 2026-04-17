import type { Message } from '../../types/message.js'

type ReactiveCompactOutcome = {
	ok: boolean
	reason?: 'too_few_groups' | 'aborted' | 'exhausted' | 'error' | 'media_unstrippable'
	result: {
		messages: Message[]
		userDisplayMessage?: string
		[key: string]: unknown
	}
}

export function isReactiveOnlyMode(): boolean {
	return false
}

export function isReactiveCompactEnabled(): boolean {
	return false
}

export function isWithheldMediaSizeError(_message: unknown): boolean {
	return false
}

export function isWithheldPromptTooLong(_message: unknown): boolean {
	return false
}

export async function reactiveCompactOnPromptTooLong(
	messages: Message[],
	_cacheSafeParams?: unknown,
	_options?: unknown,
): Promise<ReactiveCompactOutcome> {
	return {
		ok: true,
		result: {
			messages,
		},
	}
}

export async function tryReactiveCompact(input: {
	messages: Message[]
}): Promise<{ messages: Message[] }> {
	return { messages: input.messages }
}
