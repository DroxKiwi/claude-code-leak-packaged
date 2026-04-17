/**
 * Stubs 1P / événements internes — pas d'export OTEL ni d'envoi réseau.
 * GrowthBook reste couplé à `is1PEventLoggingEnabled` via les mêmes opt-outs qu'avant.
 */

import { isAnalyticsDisabled } from './config.js'
import type { GrowthBookUserAttributes } from './growthbook.js'

export async function shutdown1PEventLogging(): Promise<void> {}

export function is1PEventLoggingEnabled(): boolean {
	return !isAnalyticsDisabled()
}

export function logEventTo1P(
	_eventName: string,
	_metadata: Record<string, number | boolean | undefined> = {},
): void {}

export type GrowthBookExperimentData = {
	experimentId: string
	variationId: number
	userAttributes?: GrowthBookUserAttributes
	experimentMetadata?: Record<string, unknown>
}

export function logGrowthBookExperimentTo1P(_data: GrowthBookExperimentData): void {}

export function initialize1PEventLogging(): void {}

export async function reinitialize1PEventLoggingIfConfigChanged(): Promise<void> {}
