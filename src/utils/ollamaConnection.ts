import { verifyOllamaReachable } from '../services/api/ollamaAnthropicShim.js'
import { getGlobalConfig, saveGlobalConfig } from './config.js'

const DEFAULT_OLLAMA_HOST = 'http://127.0.0.1:11434'

/** Normalize user input: trim trailing slash; default host if empty. */
export function normalizeOllamaHostInput(raw: string): string {
	const t = raw.trim().replace(/\/+$/, '')
	return t || DEFAULT_OLLAMA_HOST
}

function applyOllamaToProcessEnv(options: {
	host: string
	apiKey: string
	model: string
}): void {
	const host = normalizeOllamaHostInput(options.host)
	const apiKey = options.apiKey.trim()
	const model = options.model.trim()

	process.env.CLAUDE_CODE_USE_OLLAMA = '1'
	process.env.OLLAMA_HOST = host
	if (apiKey) {
		process.env.OLLAMA_API_KEY = apiKey
	} else {
		process.env.OLLAMA_API_KEY = undefined
	}
	if (model) {
		process.env.OLLAMA_MODEL = model
	} else {
		process.env.OLLAMA_MODEL = undefined
	}
}

function persistOllamaToGlobalConfig(options: {
	host: string
	apiKey: string
	model: string
}): void {
	const host = normalizeOllamaHostInput(options.host)
	const apiKey = options.apiKey.trim()
	const model = options.model.trim()

	saveGlobalConfig((current) => {
		let env: Record<string, string> = {
			...(current.env ?? {}),
			CLAUDE_CODE_USE_OLLAMA: '1',
			OLLAMA_HOST: host,
		}
		if (apiKey) {
			env.OLLAMA_API_KEY = apiKey
		} else {
			const { OLLAMA_API_KEY: _a, ...rest } = env
			env = rest
		}
		if (model) {
			env.OLLAMA_MODEL = model
		} else {
			const { OLLAMA_MODEL: _m, ...rest } = env
			env = rest
		}
		return { ...current, env }
	})
}

/**
 * Verify reachability, then persist. Returns an error message when /api/tags fails.
 */
export async function tryApplyOllamaConnection(options: {
	host: string
	apiKey: string
	model: string
}): Promise<{ ok: true } | { ok: false; message: string }> {
	const prev = {
		use: process.env.CLAUDE_CODE_USE_OLLAMA,
		host: process.env.OLLAMA_HOST,
		key: process.env.OLLAMA_API_KEY,
		model: process.env.OLLAMA_MODEL,
	}
	applyOllamaToProcessEnv(options)
	const ok = await verifyOllamaReachable()
	if (!ok) {
		process.env.CLAUDE_CODE_USE_OLLAMA = prev.use
		process.env.OLLAMA_HOST = prev.host
		process.env.OLLAMA_API_KEY = prev.key
		process.env.OLLAMA_MODEL = prev.model
		const host = normalizeOllamaHostInput(options.host)
		return {
			ok: false,
			message: `Impossible de joindre Ollama (${host}). Vérifiez l’URL et que le serveur répond sur GET /api/tags.`,
		}
	}
	persistOllamaToGlobalConfig(options)
	return { ok: true }
}

/**
 * Apply Ollama settings to the current process and persist (sans vérification réseau).
 */
export function applyAndPersistOllamaConnection(options: {
	host: string
	apiKey: string
	model: string
}): void {
	applyOllamaToProcessEnv(options)
	persistOllamaToGlobalConfig(options)
}

/** Values from global config for pre-filling the setup form. */
export function getOllamaConnectionFromConfig(): {
	host: string
	apiKey: string
	model: string
} {
	const env = getGlobalConfig().env ?? {}
	return {
		host: env.OLLAMA_HOST ?? DEFAULT_OLLAMA_HOST,
		apiKey: env.OLLAMA_API_KEY ?? '',
		model: env.OLLAMA_MODEL ?? '',
	}
}
