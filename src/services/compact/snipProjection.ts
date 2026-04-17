import type { Message } from '../../types/message.js'

export function projectSnippedView(messages: Message[]): Message[] {
	return messages
}

export function isSnipBoundaryMessage(_message: unknown): boolean {
	return false
}
