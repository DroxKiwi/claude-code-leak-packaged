/**
 * Policy limits — fork « cœur mécanique » : aucun appel à l’API org Claude,
 * pas de cache disque ni polling. Toutes les politiques sont traitées comme
 * autorisées côté client (`isPolicyAllowed` → true).
 *
 * Les exports et signatures sont conservés pour les call sites existants
 * (init, main, login/logout, bridge, commandes remote, etc.).
 */

export function isPolicyLimitsEligible(): boolean {
	return false
}

export function initializePolicyLimitsLoadingPromise(): void {
	// Pas d’éligibilité : aucune promesse à installer (voir init.ts).
}

export async function waitForPolicyLimitsToLoad(): Promise<void> {
	// Résolu immédiatement lorsqu’aucun chargement n’est prévu.
}

export function isPolicyAllowed(_policy: string): boolean {
	return true
}

export async function loadPolicyLimits(): Promise<void> {
	// no-op
}

export async function refreshPolicyLimits(): Promise<void> {
	// no-op
}

export async function clearPolicyLimitsCache(): Promise<void> {
	// no-op
}

export function startBackgroundPolling(): void {}

export function stopBackgroundPolling(): void {}

export function _resetPolicyLimitsForTesting(): void {}
