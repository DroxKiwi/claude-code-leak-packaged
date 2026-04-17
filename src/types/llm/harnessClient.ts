/**
 * Options client utilisées par Harness — uniquement ce dont le code a besoin
 * (sans importer ClientOptions du SDK).
 */
export type HarnessFetchOverride = (
	input: RequestInfo | URL,
	init?: RequestInit,
) => Promise<Response>
