import { isEnvTruthy } from './envUtils.js'

/**
 * Outbound **product** metrics (historique) : endpoints opérés côté produit d’origine.
 * Dans cette distribution le chemin distant est retiré ; ce module garde le garde-fou env.
 * Séparé de :
 * - LLM / API calls for chat
 * - GrowthBook feature-flag fetches (needed for app behavior)
 *
 * In this distribution, outbound product metrics are **off by default**. Set
 * `CLAUDE_CODE_EXTERNAL_PRODUCT_METRICS=1` to allow them (still subject to
 * `DISABLE_TELEMETRY`, Bedrock/Vertex analytics opt-outs, and privacy level).
 */
export function isExternalProductMetricsEnabled(): boolean {
	return isEnvTruthy(process.env.CLAUDE_CODE_EXTERNAL_PRODUCT_METRICS)
}
