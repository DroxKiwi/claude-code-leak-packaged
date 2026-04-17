/**
 * Forme minimale des flux SSE Messages API (async iterable + AbortController).
 * Les implémentations réelles (shim Ollama, etc.) fournissent au moins ce contrat.
 */
export interface Stream<T> extends AsyncIterable<T> {
	controller: AbortController
}
