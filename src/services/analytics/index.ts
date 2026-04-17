/**
 * Analytics service — public API conservée pour le typage et les appels existants.
 * Aucun routage vers backend : les événements sont ignorés (fork sans pipeline produit).
 */

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = never

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED = never

/**
 * Retire les clés `_PROTO_*` d'un payload (utile si du code enrichit encore ces champs).
 */
export function stripProtoFields<V>(metadata: Record<string, V>): Record<string, V> {
	let result: Record<string, V> | undefined
	for (const key in metadata) {
		if (key.startsWith('_PROTO_')) {
			if (result === undefined) {
				result = { ...metadata }
			}
			delete result[key]
		}
	}
	return result ?? metadata
}

type LogEventMetadata = { [key: string]: boolean | number | undefined }

export function logEvent(_eventName: string, _metadata: LogEventMetadata): void {}

export async function logEventAsync(
	_eventName: string,
	_metadata: LogEventMetadata,
): Promise<void> {}

/** @internal */
export function _resetForTesting(): void {}
