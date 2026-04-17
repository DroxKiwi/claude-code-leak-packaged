/**
 * Traces de démarrage sur stderr (ne passe pas par console, donc visible même si Ink patchConsole).
 * Par défaut : activé. Désactiver : CLAUDE_CODE_STARTUP_LOG=0
 */
import { STARTUP_LOG_PREFIX } from '../constants/branding.js'

export function startupDebugLog(phase: string, detail?: Record<string, unknown>): void {
	if (process.env.CLAUDE_CODE_STARTUP_LOG === '0') {
		return
	}
	const extra = detail && Object.keys(detail).length > 0 ? ` ${JSON.stringify(detail)}` : ''
	process.stderr.write(`[${STARTUP_LOG_PREFIX} startup] ${phase}${extra}\n`)
}
