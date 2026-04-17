export function parseConnectUrl(url: string): {
	serverUrl: string
	authToken?: string
} {
	const normalized = url.replace(/^cc:\/\//, 'https://')
	return { serverUrl: normalized, authToken: undefined }
}
