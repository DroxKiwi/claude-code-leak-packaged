/**
 * Régénère `src/types/llm/messagesStandardApi.ts` à partir du fichier de définition
 * du paquet de référence (Messages API non-bêta).
 *
 * Le dépôt n’inclut plus `@anthropic-ai/sdk` dans les dépendances : pour lancer ce script,
 * installez temporairement le paquet ou pointez vers un fichier `.d.ts` local.
 *
 *   bun add -d @anthropic-ai/sdk@^0.39.0
 *   node scripts/gen-standard-messages-api.mjs
 *
 * Ou :
 *
 *   set ANTHROPIC_SDK_MESSAGES_DTS=C:\chemin\vers\messages.d.ts
 *   node scripts/gen-standard-messages-api.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const defaultPath = path.join(
  'node_modules',
  '@anthropic-ai',
  'sdk',
  'resources',
  'messages',
  'messages.d.ts',
)
const p = (process.env.ANTHROPIC_SDK_MESSAGES_DTS || defaultPath).trim()

if (!fs.existsSync(p)) {
  console.error(
    `Fichier source introuvable : ${p}\n` +
      `Installez temporairement le SDK de référence, par exemple :\n` +
      `  bun add -d @anthropic-ai/sdk@^0.39.0\n` +
      `puis relancez ce script ; ou définissez ANTHROPIC_SDK_MESSAGES_DTS vers un messages.d.ts.`,
  )
  process.exit(1)
}

let s = fs.readFileSync(p, 'utf8')
const start = s.indexOf('export interface Base64ImageSource')
const end = s.indexOf('export declare namespace Messages')
if (start < 0 || end < 0) {
  console.error(
    'Structure inattendue dans le fichier source (repères Base64ImageSource / namespace Messages).',
  )
  process.exit(1)
}
s = s.slice(start, end)
s = s.replace(/MessagesAPI\.Model/g, 'string')
s = s.replace(
  /export declare namespace MessageCreateParams \{[\s\S]*?\}\n/,
  '',
)
const header = `/**
 * Types Messages API (non-bêta) — alignés sur @anthropic-ai/sdk/resources/messages.
 * Généré par scripts/gen-standard-messages-api.mjs (voir en-tête du script).
 */

`
const out = 'src/types/llm/messagesStandardApi.ts'
fs.writeFileSync(out, header + s)
console.log('Écrit', out, '(' + fs.statSync(out).size + ' octets)')
