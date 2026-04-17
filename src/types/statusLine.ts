export type StatusLineCommandInput = {
	rate_limits?: {
		five_hour?: { used_percentage: number; resets_at: string }
		seven_day?: { used_percentage: number; resets_at: string }
	}
	[key: string]: unknown
}
