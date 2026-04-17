import type { SessionId } from './ids.js'

export type QueueOperation =
	| 'enqueue'
	| 'dequeue'
	| 'promote'
	| 'remove'
	| 'popAll'
	| 'clear'
	| 'drop'
	| 'replace'
	| 'unknown'

export type QueueOperationMessage = {
	type: 'queue-operation'
	operation: QueueOperation
	timestamp: string
	sessionId: SessionId
	content?: string
}
