/**
 * Point d’entrée « assistant » (KAIROS). Sur le fork, stub pour le typecheck ;
 * le code métier complet était derrière feature('KAIROS') en amont.
 */
import type { AppState } from '../state/AppStateStore.js'

let assistantForced = false

export function isAssistantMode(): boolean {
	return false
}

export function markAssistantForced(): void {
	assistantForced = true
}

export function isAssistantForced(): boolean {
	return assistantForced
}

export async function initializeAssistantTeam(): Promise<AppState['teamContext'] | undefined> {
	return undefined
}

export function getAssistantSystemPromptAddendum(): string {
	return ''
}

export function getAssistantActivationPath(): string | undefined {
	return undefined
}
