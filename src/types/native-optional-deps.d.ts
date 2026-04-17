declare module 'plist' {
	export function parse(src: string): unknown
}

declare module 'sharp' {
	const sharp: (input?: string | Buffer) => unknown
	export default sharp
}

declare module 'turndown' {
	export default class TurndownService {
		constructor(opts?: Record<string, unknown>)
		turndown(html: string): string
	}
}

declare module 'audio-capture-napi' {
	export function isNativeAudioAvailable(): boolean
	export function isNativeRecordingActive(): boolean
	export function stopNativeRecording(): void
	export function startNativeRecording(
		onData: (data: Buffer) => void,
		onSilenceEnd?: () => void,
	): boolean
	export function createCapture(_opts?: Record<string, unknown>): unknown
}

declare module 'image-processor-napi' {
	export const sharp: ((input: unknown) => unknown) | undefined
	export function getNativeModule(): {
		hasClipboardImage?: () => boolean
		readClipboardImage?: (
			maxWidth: number,
			maxHeight: number,
		) =>
			| {
					png: Buffer
					originalWidth: number
					originalHeight: number
					width: number
					height: number
			  }
			| null
	} | null
	export function processImage(_input: unknown): Promise<unknown>
	const _default: unknown
	export default _default
}

declare module 'cacache' {
	export const ls: {
		stream(path: string): AsyncIterable<{ key: string; time: number }>
	}
	export const rm: {
		entry(path: string, key: string): Promise<void>
	}
}

declare module '@ant/computer-use-swift' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type ComputerUseAPI = any
	export function createComputerUseSwift(): unknown
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const _default: any
	export default _default
}

declare module 'url-handler-napi' {
	export function setAsDefaultProtocolClient(_protocol: string): boolean
	export function waitForUrlEvent(_timeoutMs: number): string | null
}

declare module 'fflate' {
	export function zipSync(
		_data: Record<string, Uint8Array | string | [Uint8Array, { os: number; attrs: number }]>,
		_opts?: { level?: number },
	): Uint8Array
	export function unzipSync(
		_data: Uint8Array,
		_opts?: { filter?: (file: { name: string; size: number }) => boolean },
	): Record<string, Uint8Array>
}
