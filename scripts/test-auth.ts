// scripts/test-auth.ts
// Vérifie que Ollama répond (Harness Drox — plus de client SDK Anthropic direct).
// Usage: bun scripts/test-auth.ts

async function main() {
	const host = (process.env.OLLAMA_HOST || 'http://127.0.0.1:11434').replace(/\/$/, '')
	try {
		const r = await fetch(`${host}/api/tags`)
		if (!r.ok) {
			console.error('❌ Ollama:', r.status, r.statusText)
			process.exit(1)
		}
		const data = (await r.json()) as { models?: unknown[] }
		console.log('✅ Ollama joignable:', host)
		console.log('Modèles:', Array.isArray(data.models) ? data.models.length : 0)
	} catch (err: unknown) {
		console.error('❌ Connexion Ollama impossible:', err instanceof Error ? err.message : err)
		process.exit(1)
	}
}

main()
