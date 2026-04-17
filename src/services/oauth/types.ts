/**
 * Types OAuth / abonnement partagés par le client OAuth et le reste du CLI.
 * Le fork désactive le réseau OAuth côté exécution ; ces types restent pour le typage.
 */

export type SubscriptionType = 'max' | 'pro' | 'enterprise' | 'team' | (string & {})

export type RateLimitTier = string | null

export type BillingType = string | null

export type OAuthProfileResponse = {
	account?: {
		uuid: string
		email: string
		display_name?: string
		created_at?: string
	}
	organization?: {
		uuid: string
		name?: string | null
		organization_type?: string
		rate_limit_tier?: string | null
		has_extra_usage_enabled?: boolean | null
		billing_type?: BillingType
		subscription_created_at?: string
	}
}

export type OAuthTokens = {
	accessToken: string
	refreshToken: string
	expiresAt: number
	scopes: string[]
	subscriptionType: SubscriptionType | null
	rateLimitTier: RateLimitTier | null
	profile?: OAuthProfileResponse
	tokenAccount?: {
		uuid: string
		emailAddress: string
		organizationUuid?: string
	}
}

export type OAuthTokenExchangeResponse = {
	access_token: string
	refresh_token?: string
	expires_in: number
	scope?: string
	account?: {
		uuid: string
		email_address: string
	}
	organization?: {
		uuid?: string
	}
}

export type UserRolesResponse = {
	organization_role?: string | null
	workspace_role?: string | null
	organization_name?: string | null
}

export type ReferralCampaign = 'claude_code_guest_pass' | (string & {})

export type ReferrerRewardInfo = {
	currency: string
	amount_minor_units: number
}

export type ReferralEligibilityResponse = {
	eligible: boolean
	remaining_passes?: number | null
	referrer_reward?: ReferrerRewardInfo | null
	referral_code_details?: {
		campaign?: string
	} | null
}

export type ReferralRedemptionsResponse = {
	redemptions?: unknown[]
	limit?: number
}
