/**
 * Données persistées dans le stockage « sécurisé » (keychain / fichier local).
 */

export type McpOAuthDiscoveryState = {
	authorizationServerUrl?: string
	resourceMetadataUrl?: string
	/** Rappel disque pour l’état SDK OAuth (métadonnées volumineuses non persistées en entier, cf. #30337). */
	resourceMetadata?: unknown
	authorizationServerMetadata?: unknown
}

export type McpOAuthServerEntry = {
	serverName: string
	serverUrl: string
	accessToken: string
	expiresAt: number
	refreshToken?: string
	scope?: string
	clientId?: string
	clientSecret?: string
	stepUpScope?: string
	discoveryState?: McpOAuthDiscoveryState
}

export type McpOAuthClientConfigEntry = {
	clientSecret?: string
}

export type McpXaaIdpEntry = {
	idToken: string
	expiresAt: number
}

export type McpXaaIdpConfigEntry = {
	clientSecret?: string
}

export type SecureStorageData = {
	mcpOAuth?: Record<string, McpOAuthServerEntry>
	mcpOAuthClientConfig?: Record<string, McpOAuthClientConfigEntry>
	mcpXaaIdp?: Record<string, McpXaaIdpEntry>
	mcpXaaIdpConfig?: Record<string, McpXaaIdpConfigEntry>
	pluginSecrets?: Record<string, Record<string, string>>
	/** Jeton appareil de confiance (bridge) — optionnel selon déploiement. */
	trustedDeviceToken?: string
}

export interface SecureStorage {
	name: string
	read(): SecureStorageData | null
	readAsync(): Promise<SecureStorageData | null>
	update(data: SecureStorageData): { success: boolean; warning?: string }
	delete(): boolean
}
