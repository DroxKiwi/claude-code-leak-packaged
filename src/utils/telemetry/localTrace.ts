/**
 * Remplace `@opentelemetry/api` pour les spans « enhanced / beta » : pas d’export réseau,
 * uniquement des ids stables pour le bookkeeping `sessionTracing` + appels no-op.
 */
import { randomBytes } from 'node:crypto'

export type TraceSpanContext = {
	traceId: string
	spanId: string
	traceFlags: number
}

export interface SessionTraceSpan {
	spanContext(): TraceSpanContext
	setAttribute(key: string, value: string | number | boolean): void
	setAttributes(attrs: Record<string, string | number | boolean>): void
	end(): void
	addEvent(name: string, attributes?: Record<string, string | number | boolean>): void
	recordException(error: Error): void
}

class LocalSessionSpan implements SessionTraceSpan {
	readonly #spanId: string

	constructor(
		_name: string,
		_options?: { attributes?: Record<string, string | number | boolean> },
	) {
		this.#spanId = randomBytes(8).toString('hex')
	}

	spanContext(): TraceSpanContext {
		return {
			traceId: '0'.repeat(32),
			spanId: this.#spanId,
			traceFlags: 0,
		}
	}

	setAttribute(_key: string, _value: string | number | boolean): void {}

	setAttributes(_attrs: Record<string, string | number | boolean>): void {}

	end(): void {}

	addEvent(_name: string, _attributes?: Record<string, string | number | boolean>): void {}

	recordException(_error: Error): void {}
}

const ROOT_CONTEXT = Object.freeze({})
export type TraceContext = typeof ROOT_CONTEXT

const tracerImpl = {
	startSpan(
		name: string,
		options?: { attributes?: Record<string, string | number | boolean> },
		_parentContext?: TraceContext,
	): SessionTraceSpan {
		return new LocalSessionSpan(name, options)
	},
}

export const trace = {
	getTracer(_name: string, _version?: string) {
		return tracerImpl
	},

	getActiveSpan(): SessionTraceSpan | undefined {
		return undefined
	},

	setSpan(_ctx: TraceContext, _span: SessionTraceSpan): TraceContext {
		return ROOT_CONTEXT
	},
}

export const context = {
	active(): TraceContext {
		return ROOT_CONTEXT
	},
}

export type Span = SessionTraceSpan
