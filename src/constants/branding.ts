/**
 * Fork branding: user-visible name and CLI identifier.
 * Réexporté depuis `product.ts` — préférer `import { … } from './product.js'`
 * pour la copy CLI et la doc découverte (`docs/GUIDE-REFONTE-DROX.md` §10).
 */
export const APP_DISPLAY_NAME = 'Drox'
/** Commander / argv program name */
export const CLI_PROGRAM_NAME = 'drox'
/** Prefix for startup logs on stderr */
export const STARTUP_LOG_PREFIX = 'drox'
/** OTEL / analytics service.name when exported */
export const OTEL_SERVICE_NAME = 'drox'
/** HTTP User-Agent product token (e.g. drox/1.2.3) */
export const USER_AGENT_APP_SLUG = 'drox'
