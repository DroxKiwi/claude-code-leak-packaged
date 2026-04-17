/**
 * Fork Drox: OpenTelemetry SDK, OTLP exporters, and internal metrics export removed.
 * `initializeTelemetry()` no longer registers a MeterProvider — session counters stay unset.
 * Perfetto (`CLAUDE_CODE_PERFETTO_TRACE`) is unchanged — see `perfettoTracing.ts`.
 */
import { logForDebugging } from '../debug.js'
import { profileCheckpoint } from '../startupProfiler.js'
import { initializePerfettoTracing } from './perfettoTracing.js'
import { endInteractionSpan } from './sessionTracing.js'
import type { TelemetryMeter } from './telemetryTypes.js'

/** Legacy hook: env mapping for `ant` builds was handled here; no-op on fork. */
export function bootstrapTelemetry(): void {}

/** Kept for callers that parse OTEL_* lists; unused when telemetry is off. */
export function parseExporterTypes(value: string | undefined): string[] {
	return (value || '')
		.trim()
		.split(',')
		.filter(Boolean)
		.map((t) => t.trim())
		.filter((t) => t !== 'none')
}

export function isTelemetryEnabled(): boolean {
	return false
}

export async function initializeTelemetry(): Promise<TelemetryMeter | null> {
	profileCheckpoint('telemetry_init_start')
	bootstrapTelemetry()
	initializePerfettoTracing()
	logForDebugging('[telemetry] OTLP / OpenTelemetry SDK disabled (Drox fork)')
	profileCheckpoint('telemetry_init_end')
	return null
}

/** Called before logout; ends any active interaction span (ex-OTel path). */
export async function flushTelemetry(): Promise<void> {
	endInteractionSpan()
}
