/**
 * Point d’entrée **Harness** pour le client LLM (surface compatible SDK Anthropic).
 * Les backends Anthropic / Bedrock / Vertex / Foundry ont été retirés : **seul Ollama** est supporté.
 *
 * Variables : `CLAUDE_CODE_USE_OLLAMA` (défaut `1` via `cli.tsx`), `OLLAMA_HOST`, `OLLAMA_MODEL`, `OLLAMA_API_KEY`.
 * Voir `docs/GUIDE-REFONTE-DROX.md` (§16 contrats, §17 architecture).
 */
import type { HarnessAnthropicClient } from 'src/types/llm/harnessAnthropicClient.js'
import type { HarnessFetchOverride } from 'src/types/llm/harnessClient.js'
import { isOllamaMode } from '../../utils/envUtils.js'
import { createOllamaAnthropicShim } from './ollamaAnthropicShim.js'

export type HarnessLlmClientParams = {
	apiKey?: string
	maxRetries: number
	model?: string
	fetchOverride?: HarnessFetchOverride
	source?: string
}

/**
 * Client utilisé pour les requêtes de génération (messages, streaming).
 */
export async function getHarnessLlmClient(
	_params: HarnessLlmClientParams,
): Promise<HarnessAnthropicClient> {
	if (!isOllamaMode()) {
		throw new Error(
			'Drox (Harness) n’expose que le backend Ollama. Définissez CLAUDE_CODE_USE_OLLAMA=1 (défaut au lancement CLI) et OLLAMA_HOST.',
		)
	}
	return createOllamaAnthropicShim() as unknown as HarnessAnthropicClient
}

/**
 * @deprecated Utiliser `getHarnessLlmClient` — alias conservé pour migration progressive.
 */
export const getAnthropicClient = getHarnessLlmClient
