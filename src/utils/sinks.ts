import { initializeErrorLogSink } from './errorLogSink.js'

/**
 * Attache uniquement le sink d'erreurs. Les événements produit (logEvent) sont no-op.
 */
export function initSinks(): void {
	initializeErrorLogSink()
}
