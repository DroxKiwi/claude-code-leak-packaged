declare module '@ant/computer-use-mcp' {
	export type CuPermissionRequest = Record<string, unknown>
	export type CuPermissionResponse = Record<string, unknown>
	export type CuCallToolResult = {
		content?: unknown[]
		telemetry?: { error_kind?: string }
		[key: string]: unknown
	}
	export type ScreenshotDims = {
		displayId?: number
		originX?: number
		originY?: number
		width?: number
		height?: number
	}
	export type ComputerUseSessionContext = Record<string, unknown>
	export type DisplayGeometry = {
		width: number
		height: number
		scaleFactor: number
	}
	export type FrontmostApp = { bundleId: string; appName?: string; displayName?: string }
	export type InstalledApp = { appName: string; bundleId: string; displayName?: string }
	export type ResolvePrepareCaptureResult = Record<string, unknown>
	export type RunningApp = { appName: string; bundleId: string }
	export type ScreenshotResult = {
		imageBase64: string
		mimeType: string
	}
	export type ComputerExecutor = {
		capabilities: Record<string, unknown>
		listInstalledApps: () => Promise<InstalledApp[]>
		[key: string]: unknown
	}
	export const DEFAULT_GRANT_FLAGS: Record<string, boolean>
	export const API_RESIZE_PARAMS: Record<string, unknown>
	export function targetImageSize(...args: unknown[]): [number, number]
	export function buildComputerUseTools(
		...args: unknown[]
	): Array<{ name: string; description?: string; inputSchema?: unknown }>
	export function createComputerUseMcpServer(
		...args: unknown[]
	): {
		setRequestHandler: (schema: unknown, handler: (...args: unknown[]) => unknown) => void
		connect: (transport: unknown) => Promise<void>
		close: () => Promise<void>
	}
	export function bindSessionContext(
		..._args: unknown[]
	): (name: string, args: unknown) => Promise<CuCallToolResult>
}

declare module '@ant/computer-use-input' {
	export type ComputerUseInputAPI = {
		moveMouse: (x: number, y: number, animate?: boolean) => Promise<void>
		key: (key: string, action?: 'press' | 'release') => Promise<void>
		keys: (keys: string[]) => Promise<void>
		mouseDown: (button?: string) => Promise<void>
		mouseUp: (button?: string) => Promise<void>
		click: (button?: string) => Promise<void>
		scroll: (dx: number, dy: number) => Promise<void>
		typeText: (text: string) => Promise<void>
		mouseButton: (
			button: string,
			action: 'press' | 'release' | 'click',
			count?: number,
		) => Promise<void>
		mouseLocation: () => Promise<{ x: number; y: number }>
		mouseScroll: (amount: number, direction: 'vertical' | 'horizontal') => Promise<void>
		getFrontmostAppInfo: () => {
			bundleId: string
			displayName?: string
			appName?: string
		}
	}
	export type ComputerUseInput =
		| ({ isSupported: true } & ComputerUseInputAPI)
		| { isSupported: false }
}
