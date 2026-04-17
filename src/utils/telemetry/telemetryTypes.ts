/**
 * Types métriques / attributs autrefois fournis par `@opentelemetry/api`.
 */

export type TelemetryAttributes = Record<
	string,
	string | number | boolean | ReadonlyArray<string> | undefined
>

export type MetricOptions = {
	description?: string
	unit?: string
}

export type TelemetryMeter = {
	createCounter(
		name: string,
		options?: MetricOptions,
	): {
		add(value: number, attributes?: TelemetryAttributes): void
	}
}
