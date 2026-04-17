import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'
import { isEnvTruthy } from '../envUtils.js'
import { getProcessEnvInferenceBaseUrl } from '../harnessApiKeyEnv.js'

export type APIProvider = 'firstParty' | 'bedrock' | 'vertex' | 'foundry'

export function getAPIProvider(): APIProvider {
	return isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK)
		? 'bedrock'
		: isEnvTruthy(process.env.CLAUDE_CODE_USE_VERTEX)
			? 'vertex'
			: isEnvTruthy(process.env.CLAUDE_CODE_USE_FOUNDRY)
				? 'foundry'
				: 'firstParty'
}

export function getAPIProviderForStatsig(): AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
	return getAPIProvider() as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS
}

/**
 * Check if `DROX_API_BASE_URL` pointe vers l’hôte historique api.anthropic.com.
 * Sans URL configurée, considéré compatible « premier parti » pour la logique legacy.
 */
export function isFirstPartyAnthropicBaseUrl(): boolean {
	const baseUrl = getProcessEnvInferenceBaseUrl()
	if (!baseUrl) {
		return true
	}
	try {
		const host = new URL(baseUrl).host
		const allowedHosts = ['api.anthropic.com']
		if (process.env.USER_TYPE === 'ant') {
			allowedHosts.push('api-staging.anthropic.com')
		}
		return allowedHosts.includes(host)
	} catch {
		return false
	}
}
