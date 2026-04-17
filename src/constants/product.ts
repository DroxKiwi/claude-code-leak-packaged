export const PRODUCT_URL = 'https://claude.com/claude-code'

// Claude Code Remote session URLs
export const CLAUDE_AI_BASE_URL = 'https://claude.ai'
export const CLAUDE_AI_STAGING_BASE_URL = 'https://claude-ai.staging.ant.dev'
export const CLAUDE_AI_LOCAL_BASE_URL = 'http://localhost:4000'

/**
 * Determine if we're in a staging environment for remote sessions.
 * Checks session ID format and ingress URL.
 */
export function isRemoteSessionStaging(sessionId?: string, ingressUrl?: string): boolean {
	return sessionId?.includes('_staging_') === true || ingressUrl?.includes('staging') === true
}

/**
 * Determine if we're in a local-dev environment for remote sessions.
 * Checks session ID format (e.g. `session_local_...`) and ingress URL.
 */
export function isRemoteSessionLocal(sessionId?: string, ingressUrl?: string): boolean {
	return sessionId?.includes('_local_') === true || ingressUrl?.includes('localhost') === true
}

/**
 * Get the base URL for Claude AI based on environment.
 */
export function getClaudeAiBaseUrl(sessionId?: string, ingressUrl?: string): string {
	if (isRemoteSessionLocal(sessionId, ingressUrl)) {
		return CLAUDE_AI_LOCAL_BASE_URL
	}
	if (isRemoteSessionStaging(sessionId, ingressUrl)) {
		return CLAUDE_AI_STAGING_BASE_URL
	}
	return CLAUDE_AI_BASE_URL
}

/**
 * Get the full session URL for a remote session.
 *
 * The cse_→session_ translation is a temporary shim gated by
 * tengu_bridge_repl_v2_cse_shim_enabled (see isCseShimEnabled). Worker
 * endpoints (/v1/code/sessions/{id}/worker/*) want `cse_*` but the claude.ai
 * frontend currently routes on `session_*` (compat/convert.go:27 validates
 * TagSession). Same UUID body, different tag prefix. Once the server tags by
 * environment_kind and the frontend accepts `cse_*` directly, flip the gate
 * off. No-op for IDs already in `session_*` form. See toCompatSessionId in
 * src/bridge/sessionIdCompat.ts for the canonical helper (lazy-required here
 * to keep constants/ leaf-of-DAG at module-load time).
 */
export function getRemoteSessionUrl(sessionId: string, ingressUrl?: string): string {
	/* eslint-disable @typescript-eslint/no-require-imports */
	const { toCompatSessionId } = require('../bridge/sessionIdCompat.js') as typeof import('../bridge/sessionIdCompat.js')
	/* eslint-enable @typescript-eslint/no-require-imports */
	const compatId = toCompatSessionId(sessionId)
	const baseUrl = getClaudeAiBaseUrl(compatId, ingressUrl)
	return `${baseUrl}/code/${compatId}`
}

const DEFAULT_CLAUDE_AI_WEB_ORIGIN = 'https://claude.ai'

function trimTrailingSlash(s: string): string {
	return s.replace(/\/$/, '')
}

/**
 * Origine du frontal cloud (ex. `https://claude.ai`). Override : **`DROX_CLOUD_CONSOLE_ORIGIN`**.
 * Sert aux chemins `/settings/billing`, `/upgrade/max`, etc.
 */
export function getClaudeAiWebOrigin(): string {
	const o = process.env.DROX_CLOUD_CONSOLE_ORIGIN?.trim()
	if (o) return trimTrailingSlash(o)
	return DEFAULT_CLAUDE_AI_WEB_ORIGIN
}

/**
 * Page facturation / « Extra Usage » côté cloud (ultrareview, etc.).
 * Override complet : **`DROX_CLOUD_BILLING_URL`**. Sinon : `{origin}/settings/billing`.
 */
export function getCloudBillingSettingsUrl(): string {
	const custom = process.env.DROX_CLOUD_BILLING_URL?.trim()
	if (custom) return custom
	return `${getClaudeAiWebOrigin()}/settings/billing`
}

/**
 * Réglages confidentialité / opt-in côté cloud (Grove, **`/privacy-settings`**).
 * Override : **`DROX_CLOUD_DATA_PRIVACY_URL`**. Sinon : `{origin}/settings/data-privacy-controls`.
 */
export function getCloudDataPrivacySettingsUrl(): string {
	const custom = process.env.DROX_CLOUD_DATA_PRIVACY_URL?.trim()
	if (custom) return custom
	return `${getClaudeAiWebOrigin()}/settings/data-privacy-controls`
}

/**
 * Page usage pour la commande **`/extra-usage`** (équipe vs perso).
 */
export function getClaudeAiUsageSettingsUrl(teamOrEnterprise: boolean): string {
	const base = getClaudeAiWebOrigin()
	return teamOrEnterprise ? `${base}/admin-settings/usage` : `${base}/settings/usage`
}

/**
 * Page upgrade Max pour **`/upgrade`**. Override : **`DROX_UPGRADE_URL`**.
 */
export function getClaudeAiUpgradeMaxUrl(): string {
	const custom = process.env.DROX_UPGRADE_URL?.trim()
	if (custom) return custom
	return `${getClaudeAiWebOrigin()}/upgrade/max`
}

/**
 * Ligne affichée quand l’erreur canonique « crédit insuffisant » est rendue dans le transcript.
 * Lien optionnel : **`DROX_BILLING_URL`**. Sinon message générique fournisseur (voir guide §2).
 */
export function getCreditBalanceTooLowUserMessage(): string {
	const billing = process.env.DROX_BILLING_URL?.trim()
	if (billing) {
		return `Credit balance too low · Add funds: ${billing}`
	}
	return (
		'Credit balance too low · Add capacity with your API backend (set DROX_BILLING_URL for a link). ' +
		'See docs/GUIDE-REFONTE-DROX.md §2.'
	)
}

/**
 * Liste ou fiche d’un agent planifié distant. Override : **`DROX_CLOUD_SCHEDULED_BASE_URL`**
 * (base sans id). Sinon : `{origin}/code/scheduled`.
 */
export function getCloudCodeScheduledUrl(triggerId?: string): string {
	const custom = process.env.DROX_CLOUD_SCHEDULED_BASE_URL?.trim()
	const base = custom ? trimTrailingSlash(custom) : `${getClaudeAiWebOrigin()}/code/scheduled`
	if (triggerId) {
		return `${base}/${triggerId}`
	}
	return base
}

/** Page d’accueil « code » distant. Override : **`DROX_CLOUD_CODE_ROOT_URL`**. */
export function getCloudCodeRootUrl(): string {
	const custom = process.env.DROX_CLOUD_CODE_ROOT_URL?.trim()
	if (custom) return custom
	return `${getClaudeAiWebOrigin()}/code`
}

/** Réglages MCP / connecteurs côté cloud. Override : **`DROX_CLOUD_CONNECTORS_URL`**. */
export function getCloudMcpConnectorsSettingsUrl(): string {
	const custom = process.env.DROX_CLOUD_CONNECTORS_URL?.trim()
	if (custom) return custom
	return `${getClaudeAiWebOrigin()}/settings/connectors`
}

/** Onboarding GitHub App (accès dépôt distant). Override : **`DROX_CLOUD_GITHUB_APP_URL`**. */
export function getCloudGitHubAppOnboardingUrl(): string {
	const custom = process.env.DROX_CLOUD_GITHUB_APP_URL?.trim()
	if (custom) return custom
	return `${getClaudeAiWebOrigin()}/code/onboarding?magic=github-app-setup`
}
