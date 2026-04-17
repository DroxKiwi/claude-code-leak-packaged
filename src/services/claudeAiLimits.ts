/**
 * État local des quotas / rate limits (fork harness sans API Anthropic directe).
 * Pas de préflight réseau, pas de lecture d’en-têtes `anthropic-ratelimit-*` sur les réponses.
 */

export type RateLimitType =
	| 'five_hour'
	| 'seven_day'
	| 'seven_day_opus'
	| 'seven_day_sonnet'
	| 'overage'

type QuotaStatus = 'allowed' | 'allowed_warning' | 'rejected'

export type OverageDisabledReason =
	| 'overage_not_provisioned'
	| 'org_level_disabled'
	| 'org_level_disabled_until'
	| 'out_of_credits'
	| 'seat_tier_level_disabled'
	| 'member_level_disabled'
	| 'seat_tier_zero_credit_limit'
	| 'group_zero_credit_limit'
	| 'member_zero_credit_limit'
	| 'org_service_level_disabled'
	| 'org_service_zero_credit_limit'
	| 'no_limits_configured'
	| 'unknown'

export type ClaudeAILimits = {
	status: QuotaStatus
	unifiedRateLimitFallbackAvailable: boolean
	resetsAt?: number
	rateLimitType?: RateLimitType
	utilization?: number
	overageStatus?: QuotaStatus
	overageResetsAt?: number
	overageDisabledReason?: OverageDisabledReason
	isUsingOverage?: boolean
	surpassedThreshold?: number
}

const DEFAULT_LIMITS: ClaudeAILimits = {
	status: 'allowed',
	unifiedRateLimitFallbackAvailable: false,
	isUsingOverage: false,
}

export let currentLimits: ClaudeAILimits = { ...DEFAULT_LIMITS }

const RATE_LIMIT_DISPLAY_NAMES: Record<RateLimitType, string> = {
	five_hour: 'session limit',
	seven_day: 'weekly limit',
	seven_day_opus: 'Opus limit',
	seven_day_sonnet: 'Sonnet limit',
	overage: 'extra usage limit',
}

export function getRateLimitDisplayName(type: RateLimitType): string {
	return RATE_LIMIT_DISPLAY_NAMES[type] || type
}

type RawWindowUtilization = {
	utilization: number
	resets_at: number
}

export type RawUtilization = {
	five_hour?: RawWindowUtilization
	seven_day?: RawWindowUtilization
}

export function getRawUtilization(): RawUtilization {
	return {}
}

type StatusChangeListener = (limits: ClaudeAILimits) => void

export const statusListeners: Set<StatusChangeListener> = new Set()

export function emitStatusChange(limits: ClaudeAILimits) {
	currentLimits = limits
	statusListeners.forEach((listener) => listener(limits))
}

export function getRateLimitErrorMessage(_limits: ClaudeAILimits, _model: string): string | null {
	return null
}

export function getRateLimitWarning(_limits: ClaudeAILimits, _model: string): string | null {
	return null
}

export function getUsingOverageText(_limits: ClaudeAILimits): string {
	return ''
}
