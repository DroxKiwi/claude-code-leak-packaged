declare module '@ant/computer-use-mcp/sentinelApps' {
	export function getSentinelCategory(_value: unknown): string | undefined
}

declare module '@ant/computer-use-mcp/types' {
	export type CoordinateMode = 'pixels' | 'normalized'
	export type CuSubGates = {
		pixelValidation: boolean
		clipboardPasteMultiline: boolean
		mouseAnimation: boolean
		hideBeforeAction: boolean
		autoTargetDisplay: boolean
		clipboardGuard: boolean
	}
	export interface Logger {
		silly(message: string, ...args: unknown[]): void
		debug(message: string, ...args: unknown[]): void
		info(message: string, ...args: unknown[]): void
		warn(message: string, ...args: unknown[]): void
		error(message: string, ...args: unknown[]): void
	}
	export interface ComputerUseHostAdapter {
		serverName: string
		logger: Logger
		executor: {
			capabilities: Record<string, unknown>
			listInstalledApps: () => Promise<Array<{ appName: string; bundleId: string }>>
		}
		ensureOsPermissions: () => Promise<Record<string, unknown>>
		isDisabled: () => boolean
		getSubGates: () => CuSubGates
		getAutoUnhideEnabled: () => boolean
		cropRawPatch: () => unknown
	}

	export type CuPermissionRequest = {
		tccState?: {
			accessibility: boolean
			screenRecording: boolean
		}
		[key: string]: unknown
	}

	export type CuPermissionResponse = {
		granted: unknown[]
		denied: unknown[]
		flags: Record<string, unknown>
	}

	export const DEFAULT_GRANT_FLAGS: Record<string, unknown>
}
