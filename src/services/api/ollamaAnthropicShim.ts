/**
 * Ollama backend for Drox — maps Anthropic-style beta.messages calls to
 * POST /api/chat (NDJSON stream).
 *
 * Env:
 *   CLAUDE_CODE_USE_OLLAMA=1   — enable this shim (required)
 *   OLLAMA_HOST                — default http://127.0.0.1:11434
 *   OLLAMA_MODEL               — Ollama model tag (recommended). When set, overrides
 *                                the CLI’s internal Claude model id for every request.
 *   OLLAMA_API_KEY             — Optional Bearer token for /api/chat and /api/tags
 *                                (reverse proxy, remote Ollama, etc.).
 */
import { randomUUID } from 'node:crypto'

function getOllamaBaseUrl(): string {
	const raw = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434'
	return raw.replace(/\/$/, '')
}

/** Optional Bearer token for Ollama behind a reverse proxy / tunnel. */
function getOllamaAuthHeaders(): Record<string, string> {
	const key = process.env.OLLAMA_API_KEY?.trim()
	if (!key) return {}
	return { Authorization: `Bearer ${key}` }
}

function ollamaJsonHeaders(): Record<string, string> {
	return { 'Content-Type': 'application/json', ...getOllamaAuthHeaders() }
}

function systemToString(system: unknown): string {
	if (!system) return ''
	if (typeof system === 'string') return system
	if (Array.isArray(system)) {
		return system
			.map((b: { type?: string; text?: string }) => (b?.type === 'text' ? (b.text ?? '') : ''))
			.filter(Boolean)
			.join('\n')
	}
	return ''
}

function anthropicUserContentToString(content: unknown): string {
	if (typeof content === 'string') return content
	if (!Array.isArray(content)) return JSON.stringify(content)
	const parts: string[] = []
	for (const block of content as Record<string, unknown>[]) {
		if (!block || typeof block !== 'object') continue
		if (block.type === 'text' && typeof block.text === 'string') {
			parts.push(block.text)
			continue
		}
		if (block.type === 'tool_result') {
			const id = block.tool_use_id ?? 'tool'
			const c = block.content
			const body =
				typeof c === 'string' ? c : Array.isArray(c) ? JSON.stringify(c) : JSON.stringify(c)
			parts.push(`[tool_result ${id}]\n${body}`)
			continue
		}
		if (block.type === 'tool_use') {
			parts.push(
				`[tool_use ${String(block.name)} id=${String(block.id)}] ${JSON.stringify(block.input ?? {})}`,
			)
			continue
		}
		parts.push(JSON.stringify(block))
	}
	return parts.join('\n\n')
}

function anthropicToolsToOllama(tools: unknown):
	| Array<{
			type: 'function'
			function: { name: string; description: string; parameters: Record<string, unknown> }
	  }>
	| undefined {
	if (!tools || !Array.isArray(tools) || tools.length === 0) return undefined
	const out: Array<{
		type: 'function'
		function: { name: string; description: string; parameters: Record<string, unknown> }
	}> = []
	for (const t of tools as Record<string, unknown>[]) {
		const name = t.name
		if (typeof name !== 'string') continue
		out.push({
			type: 'function',
			function: {
				name,
				description: typeof t.description === 'string' ? t.description : '',
				parameters: (t.input_schema as Record<string, unknown>) ?? {
					type: 'object',
					properties: {},
				},
			},
		})
	}
	return out.length ? out : undefined
}

function buildOllamaBody(params: Record<string, unknown>, stream: boolean) {
	const messages: Array<{ role: string; content: string }> = []
	const sys = systemToString(params.system)
	if (sys) messages.push({ role: 'system', content: sys })
	for (const m of (params.messages as Array<{ role: string; content: unknown }>) ?? []) {
		messages.push({
			role: m.role,
			content: anthropicUserContentToString(m.content),
		})
	}
	const model = process.env.OLLAMA_MODEL || (params.model as string) || 'llama3.2'
	const options: Record<string, unknown> = {}
	if (typeof params.temperature === 'number') {
		options.temperature = params.temperature
	}
	if (typeof params.max_tokens === 'number') {
		options.num_predict = params.max_tokens
	}
	const body: Record<string, unknown> = {
		model,
		messages,
		stream,
		...(Object.keys(options).length > 0 && { options }),
	}
	const tools = anthropicToolsToOllama(params.tools)
	if (tools) body.tools = tools
	return body
}

function makeToolId(): string {
	return `toolu_${randomUUID().replace(/-/g, '').slice(0, 24)}`
}

async function* ollamaRawStreamEvents(
	params: Record<string, unknown>,
	signal: AbortSignal | undefined,
): AsyncGenerator<Record<string, unknown>> {
	const base = getOllamaBaseUrl()
	const body = buildOllamaBody(params, true)
	const res = await fetch(`${base}/api/chat`, {
		method: 'POST',
		headers: ollamaJsonHeaders(),
		body: JSON.stringify(body),
		signal,
	})
	if (!res.ok) {
		const errText = await res.text().catch(() => '')
		throw new Error(`Ollama /api/chat failed: ${res.status} ${errText}`)
	}
	if (!res.body) {
		throw new Error('Ollama: empty response body')
	}

	const msgId = randomUUID()
	yield {
		type: 'message_start',
		message: {
			id: msgId,
			type: 'message',
			role: 'assistant',
			content: [],
			model: body.model,
			stop_reason: null,
			stop_sequence: null,
			usage: { input_tokens: 0, output_tokens: 0 },
		},
	}

	const reader = res.body.getReader()
	const decoder = new TextDecoder()
	let buffer = ''
	let textBlockIndex = 0
	let textStarted = false
	let finalToolCalls: Array<{
		function?: { name?: string; arguments?: string }
	}> = []

	try {
		while (true) {
			const { done, value } = await reader.read()
			if (done) break
			buffer += decoder.decode(value, { stream: true })
			const lines = buffer.split('\n')
			buffer = lines.pop() ?? ''
			for (const line of lines) {
				const trimmed = line.trim()
				if (!trimmed) continue
				let json: Record<string, unknown>
				try {
					json = JSON.parse(trimmed) as Record<string, unknown>
				} catch {
					continue
				}
				const message = json.message as Record<string, unknown> | undefined
				const piece = typeof message?.content === 'string' ? message.content : ''
				if (piece) {
					if (!textStarted) {
						yield {
							type: 'content_block_start',
							index: textBlockIndex,
							content_block: { type: 'text', text: '' },
						}
						textStarted = true
					}
					yield {
						type: 'content_block_delta',
						index: textBlockIndex,
						delta: { type: 'text_delta', text: piece },
					}
				}
				if (json.done === true && message?.tool_calls) {
					finalToolCalls = message.tool_calls as typeof finalToolCalls
				}
			}
		}
	} finally {
		reader.releaseLock()
	}

	if (textStarted) {
		yield { type: 'content_block_stop', index: textBlockIndex }
		textBlockIndex++
	}

	for (const tc of finalToolCalls) {
		const fn = tc.function
		const name = fn?.name ?? 'unknown_tool'
		const argsRaw = fn?.arguments ?? '{}'
		const argsStr = typeof argsRaw === 'string' ? argsRaw : JSON.stringify(argsRaw)
		const tid = makeToolId()
		yield {
			type: 'content_block_start',
			index: textBlockIndex,
			content_block: { type: 'tool_use', id: tid, name },
		}
		const chunk = 256
		for (let i = 0; i < argsStr.length; i += chunk) {
			yield {
				type: 'content_block_delta',
				index: textBlockIndex,
				delta: {
					type: 'input_json_delta',
					partial_json: argsStr.slice(i, i + chunk),
				},
			}
		}
		yield { type: 'content_block_stop', index: textBlockIndex }
		textBlockIndex++
	}

	yield {
		type: 'message_delta',
		usage: { output_tokens: 0, input_tokens: 0 },
		delta: { stop_reason: 'end_turn' },
	}
	yield { type: 'message_stop' }
}

async function ollamaNonStreamMessage(
	params: Record<string, unknown>,
	signal: AbortSignal | undefined,
): Promise<Record<string, unknown>> {
	const base = getOllamaBaseUrl()
	const body = buildOllamaBody(params, false)
	const res = await fetch(`${base}/api/chat`, {
		method: 'POST',
		headers: ollamaJsonHeaders(),
		body: JSON.stringify(body),
		signal,
	})
	if (!res.ok) {
		const errText = await res.text().catch(() => '')
		throw new Error(`Ollama /api/chat failed: ${res.status} ${errText}`)
	}
	const json = (await res.json()) as Record<string, unknown>
	const message = json.message as Record<string, unknown> | undefined
	const text = typeof message?.content === 'string' ? message.content : ''
	return {
		id: randomUUID(),
		type: 'message',
		role: 'assistant',
		content: [{ type: 'text', text }],
		model: body.model,
		stop_reason: 'end_turn',
		stop_sequence: null,
		usage: { input_tokens: 0, output_tokens: 0 },
	}
}

function ollamaMessagesCreate(params: Record<string, unknown>, options?: { signal?: AbortSignal }) {
	if (params.stream === true) {
		const stream = ollamaRawStreamEvents(params, options?.signal)
		return {
			withResponse: () =>
				Promise.resolve({
					data: stream,
					response: new Response(),
					request_id: randomUUID(),
				}),
		}
	}

	const inner = ollamaNonStreamMessage(params, options?.signal)
	return {
		withResponse: () =>
			inner.then((data) => ({
				data,
				response: new Response(),
				request_id: randomUUID(),
			})),
		then: (onFulfilled?: (v: unknown) => unknown, onRejected?: (e: unknown) => unknown) =>
			inner.then(onFulfilled as any, onRejected),
		catch: (onRejected?: (e: unknown) => unknown) => inner.catch(onRejected),
		finally: (onFinally?: () => void) => inner.finally(onFinally),
	}
}

export function createOllamaAnthropicShim(): {
	beta: { messages: { create: typeof ollamaMessagesCreate } }
} {
	return {
		beta: {
			messages: {
				create: ollamaMessagesCreate,
			},
		},
	}
}

export async function verifyOllamaReachable(): Promise<boolean> {
	try {
		const base = getOllamaBaseUrl()
		const r = await fetch(`${base}/api/tags`, {
			method: 'GET',
			headers: getOllamaAuthHeaders(),
		})
		return r.ok
	} catch {
		return false
	}
}
