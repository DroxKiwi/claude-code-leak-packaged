/**
 * Connector text content blocks (internal Anthropic API) — not shipped in the
 * public leak. Stubs keep the codebase type-checking; CONNECTOR_TEXT is off for
 * external builds, so these paths are effectively dead.
 */

export type ConnectorTextBlock = {
	type: 'connector_text'
	connector_text: string
	signature?: string
}

export type ConnectorTextDelta = {
	type: 'connector_text_delta'
	connector_text: string
}

export function isConnectorTextBlock(block: unknown): block is ConnectorTextBlock {
	if (!block || typeof block !== 'object') return false
	const b = block as Record<string, unknown>
	return b.type === 'connector_text' && typeof b.connector_text === 'string'
}
