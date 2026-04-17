import { type GlobalConfig, saveGlobalConfig } from '../utils/config.js'

/**
 * Migrate the `replBridgeEnabled` config key to `remoteControlAtStartup`.
 *
 * The old key was an implementation detail that leaked into user-facing config.
 * This migration copies the value to the new key and removes the old one.
 * Idempotent — only acts when the old key exists and the new one doesn't.
 */
export function migrateReplBridgeEnabledToRemoteControlAtStartup(): void {
	saveGlobalConfig((prev) => {
		const record = prev as GlobalConfig & Record<string, unknown>
		const oldValue = record.replBridgeEnabled
		if (oldValue === undefined) return prev
		if (prev.remoteControlAtStartup !== undefined) return prev

		const next: GlobalConfig & Record<string, unknown> = {
			...prev,
			remoteControlAtStartup: Boolean(oldValue),
		}
		delete next.replBridgeEnabled
		return next as GlobalConfig
	})
}
