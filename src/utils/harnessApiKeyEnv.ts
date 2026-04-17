/**
 * Variables d’environnement d’inférence (fork Drox) : **uniquement** le préfixe
 * `DROX_*`. Aucun lecture `ANTHROPIC_*` — voir `docs/GUIDE-REFONTE-DROX.md` (§16).
 */
export function getProcessEnvInferenceApiKey(): string | undefined {
	return process.env.DROX_API_KEY?.trim() || undefined
}

/**
 * Base URL HTTP pour un backend style Messages API (hors Ollama).
 */
export function getProcessEnvInferenceBaseUrl(): string | undefined {
	return process.env.DROX_API_BASE_URL?.trim() || undefined
}
