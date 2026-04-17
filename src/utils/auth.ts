/**
 * Auth Drox (fork) : **aucun** OAuth, keychain, apiKeyHelper ni refresh cloud.
 * La seule source de clé est `DROX_API_KEY` (`getProcessEnvInferenceApiKey`).
 *
 * Les symboles exportés reprennent les noms historiques pour limiter les
 * changements d’import dans le dépôt ; le comportement est neutralisé ou no-op.
 */
import memoize from 'lodash-es/memoize.js'
import type { OAuthTokens, SubscriptionType } from '../services/oauth/types.js'
import type { AccountInfo } from './config.js'
import { getProcessEnvInferenceApiKey } from './harnessApiKeyEnv.js'
import { memoizeWithTTLAsync } from './memoize.js'
import { getAPIProvider } from './model/providers.js'

const AWS_GCP_TTL_MS = 5 * 60 * 1000

export function isAnthropicAuthEnabled(): boolean {
	return false
}

export function getAuthTokenSource():
	| { source: 'DROX_API_KEY'; hasToken: true }
	| { source: 'none'; hasToken: false } {
	const key = getProcessEnvInferenceApiKey()
	if (key) {
		return { source: 'DROX_API_KEY', hasToken: true }
	}
	return { source: 'none', hasToken: false }
}

export type ApiKeySource = 'DROX_API_KEY' | 'apiKeyHelper' | '/login managed key' | 'none'

export function getAnthropicApiKey(): null | string {
	return getProcessEnvInferenceApiKey() ?? null
}

export function hasAnthropicApiKeyAuth(): boolean {
	return Boolean(getProcessEnvInferenceApiKey())
}

export function getAnthropicApiKeyWithSource(_opts?: {
	skipRetrievingKeyFromApiKeyHelper?: boolean
}): { key: null | string; source: ApiKeySource } {
	const key = getProcessEnvInferenceApiKey() ?? null
	if (key) {
		return { key, source: 'DROX_API_KEY' }
	}
	return { key: null, source: 'none' }
}

export function getConfiguredApiKeyHelper(): string | undefined {
	return undefined
}

export function isAwsAuthRefreshFromProjectSettings(): boolean {
	return false
}

export function isAwsCredentialExportFromProjectSettings(): boolean {
	return false
}

export function calculateApiKeyHelperTTL(): number {
	return 0
}

export function getApiKeyHelperElapsedMs(): number {
	return 0
}

export async function getApiKeyFromApiKeyHelper(): Promise<string | null> {
	return null
}

export function getApiKeyFromApiKeyHelperCached(): string | null {
	return null
}

export function clearApiKeyHelperCache(): void {}

export function prefetchApiKeyFromApiKeyHelperIfSafe(_isNonInteractiveSession?: boolean): void {}

export function refreshAwsAuth(_refresh: string): Promise<boolean> {
	return Promise.resolve(false)
}

export const refreshAndGetAwsCredentials = memoizeWithTTLAsync(
	async (): Promise<{
		accessKeyId: string
		secretAccessKey: string
		sessionToken: string
	} | null> => Promise.resolve(null),
	AWS_GCP_TTL_MS,
)

export function clearAwsCredentialsCache(): void {
	refreshAndGetAwsCredentials.cache.clear()
}

export function isGcpAuthRefreshFromProjectSettings(): boolean {
	return false
}

export async function checkGcpCredentialsValid(): Promise<boolean> {
	return false
}

export function refreshGcpAuth(_refresh: string): Promise<boolean> {
	return Promise.resolve(false)
}

export const refreshGcpCredentialsIfNeeded = memoizeWithTTLAsync(
	async (): Promise<unknown> => Promise.resolve(null),
	AWS_GCP_TTL_MS,
)

export function clearGcpCredentialsCache(): void {
	refreshGcpCredentialsIfNeeded.cache.clear()
}

export function prefetchGcpCredentialsIfSafe(): void {}

export function prefetchAwsCredentialsAndBedRockInfoIfSafe(): void {}

export const getApiKeyFromConfigOrMacOSKeychain = memoize(
	(): { key: string; source: ApiKeySource } | null => null,
)

export async function saveApiKey(_apiKey: string): Promise<void> {
	/* no-op — utiliser DROX_API_KEY */
}

export function isCustomApiKeyApproved(_apiKey: string): boolean {
	return true
}

export async function removeApiKey(): Promise<void> {
	/* no-op */
}

export function saveOAuthTokensIfNeeded(_tokens: OAuthTokens): {
	success: boolean
	warning?: string
} {
	return { success: true }
}

export const getClaudeAIOAuthTokens = memoize((): OAuthTokens | null => null)

export function clearOAuthTokenCache(): void {
	getClaudeAIOAuthTokens.cache?.clear?.()
}

export function handleOAuth401Error(_failedAccessToken: string): Promise<boolean> {
	return Promise.resolve(false)
}

export async function getClaudeAIOAuthTokensAsync(): Promise<OAuthTokens | null> {
	return null
}

export function checkAndRefreshOAuthTokenIfNeeded(
	_retryCount = 0,
	_force = false,
): Promise<boolean> {
	return Promise.resolve(false)
}

export function isClaudeAISubscriber(): boolean {
	return false
}

export function hasProfileScope(): boolean {
	return false
}

export function is1PApiCustomer(): boolean {
	return true
}

export function getOauthAccountInfo(): AccountInfo | undefined {
	return undefined
}

export function isOverageProvisioningAllowed(): boolean {
	return false
}

export function hasOpusAccess(): boolean {
	return true
}

export function getSubscriptionType(): SubscriptionType | null {
	return null
}

export function isMaxSubscriber(): boolean {
	return false
}

export function isTeamSubscriber(): boolean {
	return false
}

export function isTeamPremiumSubscriber(): boolean {
	return false
}

export function isEnterpriseSubscriber(): boolean {
	return false
}

export function isProSubscriber(): boolean {
	return false
}

export function getRateLimitTier(): string | null {
	return null
}

export function getSubscriptionName(): string {
	return ''
}

export function isUsing3PServices(): boolean {
	return false
}

export function isOtelHeadersHelperFromProjectOrLocalSettings(): boolean {
	return false
}

export function getOtelHeadersFromHelper(): Record<string, string> {
	return {}
}

export function isConsumerSubscriber(): boolean {
	return true
}

export type UserAccountInfo = {
	subscription?: string
	tokenSource?: string
	apiKeySource?: ApiKeySource
	organization?: string
	email?: string
}

export function getAccountInformation(): UserAccountInfo | undefined {
	if (getAPIProvider() !== 'firstParty') {
		return undefined
	}
	const { key, source } = getAnthropicApiKeyWithSource()
	if (!key) {
		return undefined
	}
	return { tokenSource: 'DROX_API_KEY', apiKeySource: source }
}

export type OrgValidationResult = { valid: true } | { valid: false; message: string }

export async function validateForceLoginOrg(): Promise<OrgValidationResult> {
	return { valid: true }
}
