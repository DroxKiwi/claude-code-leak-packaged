/** Shims pour dépendances LSP absentes du graphe de types (fork / install minimal). */

declare module 'vscode-jsonrpc/node.js' {
	export enum Trace {
		Off = 0,
		Messages = 1,
		Verbose = 2,
	}

	export interface MessageConnection {
		listen(): void
		trace(
			level: Trace,
			options: { log: (message: string) => void },
		): Promise<void>
		onNotification(method: string, handler: (params: unknown) => void): void
		onRequest(
			method: string,
			handler: (params: unknown) => unknown | Promise<unknown>,
		): void
		sendRequest<TResult = unknown>(method: string, params?: unknown): Promise<TResult>
		sendNotification(method: string, params?: unknown): Promise<void>
		onError(handler: (data: [Error, unknown, unknown]) => void): void
		onClose(handler: () => void): void
		dispose(): void
	}

	export class StreamMessageReader {
		constructor(readable: import('node:stream').Readable)
	}

	export class StreamMessageWriter {
		constructor(writable: import('node:stream').Writable)
	}

	export function createMessageConnection(
		input: StreamMessageReader,
		output: StreamMessageWriter,
		logger?: unknown,
		options?: unknown,
	): MessageConnection
}

declare module 'vscode-languageserver-protocol' {
	export type ServerCapabilities = Record<string, unknown>

	export type InitializeParams = Record<string, unknown>

	export type InitializeResult = {
		capabilities?: ServerCapabilities
		[key: string]: unknown
	}

	export type PublishDiagnosticsParams = {
		uri: string
		diagnostics?: unknown[]
		[key: string]: unknown
	}
}

declare module 'vscode-languageserver-types' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- shim fork sans paquet vscode-languageserver-types
	export type CallHierarchyIncomingCall = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type CallHierarchyItem = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type CallHierarchyOutgoingCall = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type DocumentSymbol = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type Hover = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type LocationLink = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type MarkedString = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type MarkupContent = any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type SymbolInformation = any
	export type SymbolKind = number
	export type Position = { line: number; character: number }
	export type Range = { start: Position; end: Position }
	export type Location = { uri: string; range: Range }
}
