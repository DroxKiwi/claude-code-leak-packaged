/**
 * Registre MCP « officiel » (URLs déclarées côté Anthropic).
 * Fork mécanique : aucun fetch réseau — `officialUrls` n’est peuplé que par
 * des tests via `resetOfficialMcpUrlsForTesting` / futurs overrides locaux.
 */

let officialUrls: Set<string> | undefined = undefined

export async function prefetchOfficialMcpUrls(): Promise<void> {
	// no-op
}

/**
 * Returns true iff the given (already-normalized via getLoggingSafeMcpBaseUrl)
 * URL is in the loaded registry. Sans fetch : false sauf si le Set a été injecté.
 */
export function isOfficialMcpUrl(normalizedUrl: string): boolean {
	return officialUrls?.has(normalizedUrl) ?? false
}

export function resetOfficialMcpUrlsForTesting(): void {
	officialUrls = undefined
}
