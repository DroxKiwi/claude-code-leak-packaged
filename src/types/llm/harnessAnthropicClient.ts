/**
 * Client LLM au format attendu par le shim Ollama (`createOllamaAnthropicShim`).
 * `withRetry` et la boucle principale ne font que transmettre l’instance aux callbacks.
 */
export type HarnessAnthropicClient = {
	beta: {
		messages: {
			create(
				body: unknown,
				options?: unknown,
			): {
				withResponse(): Promise<unknown>
			}
		}
	}
}
