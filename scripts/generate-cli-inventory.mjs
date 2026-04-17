/**
 * Génère inventory/cli-dependency-inventory.md : imports src/, dépendances npm, runtimes.
 * Filtre les faux positifs (commentaires contenant from '...') via validation des noms npm.
 *
 * Run: node scripts/generate-cli-inventory.mjs
 * Requiert `bun` en PATH pour la liste des noms slash (§8.1).
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(process.cwd(), 'src')
const OUT = path.join(process.cwd(), 'inventory', 'cli-dependency-inventory.md')
const PKG_JSON = path.join(process.cwd(), 'package.json')

const fromRe =
  /from\s+['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)/g

/** npm package root (scoped or not), or null for relative / non-npm */
function npmRoot(spec) {
  if (!spec || spec.startsWith('.') || spec.startsWith('/')) return null
  if (spec.startsWith('src/')) return { kind: 'alias', root: 'src/*' }
  if (spec.startsWith('node:')) return { kind: 'node', root: spec.split('/')[0] }
  if (spec.startsWith('bun:')) return { kind: 'bun', root: spec.split('/')[0] }
  if (spec.startsWith('#')) return { kind: 'hash', root: spec.split('/')[0] }
  const parts = spec.split('/')
  let root
  if (parts[0].startsWith('@')) {
    if (parts.length < 2) return null
    root = `${parts[0]}/${parts[1]}`
  } else {
    root = parts[0]
  }
  if (!isValidNpmPackageName(root)) return null
  return { kind: 'npm', root }
}

/** Rejette les correspondances dans les commentaires du type `from '-A20'` */
function isValidNpmPackageName(name) {
  if (name.startsWith('@')) {
    const m = name.match(/^@([a-z0-9][a-z0-9_.-]*)\/([a-z0-9][a-z0-9_.-]*)$/i)
    return Boolean(m)
  }
  return /^[a-z0-9][a-z0-9_.-]*$/i.test(name)
}

const buckets = {
  npm: new Map(),
  node: new Map(),
  bun: new Map(),
  hash: new Map(),
  aliasSrc: new Set(),
}

function add(bucket, key, file) {
  if (!bucket.has(key)) bucket.set(key, new Set())
  bucket.get(key).add(file)
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules') continue
      walk(p)
    } else if (/\.tsx?$/.test(ent.name)) {
      scan(p)
    }
  }
}

function scan(file) {
  const s = fs.readFileSync(file, 'utf8')
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/')
  let m
  while ((m = fromRe.exec(s)) !== null) {
    const spec = m[1] || m[2]
    const parsed = npmRoot(spec)
    if (!parsed) continue
    if (parsed.kind === 'npm') add(buckets.npm, parsed.root, rel)
    else if (parsed.kind === 'node') add(buckets.node, parsed.root, rel)
    else if (parsed.kind === 'bun') add(buckets.bun, parsed.root, rel)
    else if (parsed.kind === 'hash') add(buckets.hash, parsed.root, rel)
    else if (parsed.kind === 'alias') buckets.aliasSrc.add(rel)
  }
}

function loadPackageJson() {
  return JSON.parse(fs.readFileSync(PKG_JSON, 'utf8'))
}

function formatPkgSection(title, obj) {
  let o = `### ${title}\n\n`
  o += '```json\n'
  o += JSON.stringify(obj, null, 2)
  o += '\n```\n\n'
  return o
}

function formatFileList(files) {
  return [...files].sort().map((f) => `- \`${f}\``).join('\n')
}

function main() {
  walk(ROOT)
  const pkg = loadPackageJson()
  const depNames = new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ])

  const npmSorted = [...buckets.npm.entries()].sort((a, b) => {
    const ca = a[1].size
    const cb = b[1].size
    if (cb !== ca) return cb - ca
    return a[0].localeCompare(b[0])
  })

  const importedNotInPkg = npmSorted
    .map(([name]) => name)
    .filter((n) => !depNames.has(n))
  const inPkgNotImported = [...depNames].filter((n) => !buckets.npm.has(n))

  let md = `# Inventaire CLI — dépendances et imports (\`src/\`)\n\n`
  md += `Généré par \`node scripts/generate-cli-inventory.mjs\` : **§1–4** scan des \`import\`/\`from\` sous \`src/\` (noms npm validés pour exclure les faux positifs dans les commentaires) ; **§5–10** sections structurées (points d’entrée, Commander, REPL, routes HTTP). **§8.1** (noms slash réels) exécute \`bun\` sur \`src/commands.ts\`. À régénérer après changement d’imports ou de commandes.\n\n`
  md += `## 1. Déclarations npm (\`package.json\`)\n\n`
  md += formatPkgSection('dependencies', pkg.dependencies ?? {})
  md += formatPkgSection('devDependencies', pkg.devDependencies ?? {})
  md += `### Bin\n\n- \`${Object.keys(pkg.bin ?? {}).join('`, `')}\` → \`${pkg.bin?.[Object.keys(pkg.bin ?? {})[0]]}\`\n\n`
  md += `### main / entry CLI\n\n- \`main\`: \`${pkg.main ?? '—'}\`\n\n`

  md += `## 2. Synthèse des imports npm (racines uniques)\n\n`
  md += `| Paquet | Fichiers touchés |\n|--------|------------------:|\n`
  for (const [name, files] of npmSorted) {
    md += `| \`${name}\` | ${files.size} |\n`
  }
  md += `\n**Imports dans le code mais absents de \`package.json\`** (${importedNotInPkg.length}) : `
  md +=
    importedNotInPkg.length === 0
      ? 'aucun.\n\n'
      : `\`${importedNotInPkg.join('`, `')}\` (souvent résolus par le bundler / workspace / alias de build).\n\n`
  md += `**Déclarés dans \`package.json\` mais non détectés comme import racine dans \`src/\`** (${inPkgNotImported.length}) : `
  md +=
    inPkgNotImported.length === 0
      ? 'aucun.\n\n'
      : `\`${inPkgNotImported.join('`, `')}\` (scripts, tests hors \`src/\`, ou imports dynamiques non capturés).\n\n`

  md += `## 3. Liste détaillée par paquet npm\n\n`
  for (const [name, files] of npmSorted) {
    md += `### \`${name}\` (${files.size} fichiers)\n\n`
    md += formatFileList(files)
    md += `\n\n`
  }

  md += `## 4. Runtimes et alias de chemins\n\n`
  md += `### \`node:\` (modules intégrés Node)\n\n`
  if (buckets.node.size === 0) {
    md += `Aucun.\n\n`
  } else {
    for (const [name, files] of [...buckets.node.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      md += `#### \`${name}\` (${files.size})\n\n${formatFileList(files)}\n\n`
    }
  }

  md += `### \`bun:\` (runtime Bun)\n\n`
  if (buckets.bun.size === 0) {
    md += `Aucun.\n\n`
  } else {
    for (const [name, files] of [...buckets.bun.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      md += `#### \`${name}\` (${files.size})\n\n${formatFileList(files)}\n\n`
    }
  }

  md += `### Alias \`src/...\` (chemins TypeScript / résolution projet)\n\n`
  md += `Fichiers contenant au moins un \`from 'src/...'\` ou \`import('src/...')\` :\n\n`
  if (buckets.aliasSrc.size === 0) {
    md += `Aucun.\n\n`
  } else {
    md += formatFileList(buckets.aliasSrc)
    md += `\n\n`
  }

  if (buckets.hash.size > 0) {
    md += `### Imports \`#...\` (bundler / subpath)\n\n`
    for (const [name, files] of [...buckets.hash.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      md += `#### \`${name}\` (${files.size})\n\n${formatFileList(files)}\n\n`
    }
  }

  md += buildCliStructureSections()

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, md, 'utf8')
  // eslint-disable-next-line no-console
  console.log(`Wrote ${OUT}`)
}

/** Identifiants dans le tableau `COMMANDS` de `commands.ts` (noms de variables, pas les `/foo` finaux). */
function extractReplCommandVariableNames() {
  const lines = fs
    .readFileSync(path.join(process.cwd(), 'src', 'commands.ts'), 'utf8')
    .split('\n')
  let inBlock = false
  const ids = []
  for (const line of lines) {
    if (line.includes('const COMMANDS = memoize((): Command[] => [')) {
      inBlock = true
      continue
    }
    if (inBlock && /^\]\)/.test(line.trim())) break
    if (!inBlock) continue
    const t = line.trim()
    if (t.startsWith('...')) continue
    if (/^[a-zA-Z][a-zA-Z0-9_]*,?$/.test(t)) {
      ids.push(t.replace(/,$/, ''))
    }
  }
  return ids
}

/**
 * Même source que l’autocomplétion : `builtInCommandNames` = `name` + `aliases` pour chaque entrée de `COMMANDS()`.
 * `COMMANDS()` appelle `login()` qui lit l’auth — on utilise `NODE_ENV=test` + clé factice pour éviter les erreurs.
 */
function fetchBuiltInSlashNamesFromBun() {
  const snippet =
    "import { builtInCommandNames } from './src/commands.ts'; console.log(JSON.stringify([...builtInCommandNames()].sort()))"
  const r = spawnSync('bun', ['-e', snippet], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      ANTHROPIC_API_KEY: 'cli-inventory-dummy-not-used',
    },
    maxBuffer: 10 * 1024 * 1024,
  })
  if (r.status !== 0) {
    return {
      ok: false,
      error: (r.stderr || r.stdout || r.error || '').trim() || `exit ${r.status}`,
      names: [],
    }
  }
  try {
    const names = JSON.parse(r.stdout.trim())
    return { ok: true, error: '', names: Array.isArray(names) ? names : [] }
  } catch (e) {
    return { ok: false, error: String(e), names: [] }
  }
}

function buildCliStructureSections() {
  const replIds = extractReplCommandVariableNames()
  const slash = fetchBuiltInSlashNamesFromBun()
  let s = `\n## 5. Points d'entrée et orchestration\n\n`
  s += `| Fichier | Rôle |\n|---------|------|\n`
  s += `| \`package.json\` → \`bin.drox\` | Exécutable \`drox\` |\n`
  s += `| \`src/entrypoints/cli.tsx\` | Bootstrap : chemins rapides (\`--version\`, flags spéciaux), puis import dynamique de \`main.tsx\` |\n`
  s += `| \`src/main.tsx\` | Définition Commander (\`program\`), options globales, sous-commandes, action par défaut (session interactive / print) |\n`
  s += `| \`src/commands.ts\` | Registre des **commandes slash** REPL (\`/\` dans le TUI) via \`getCommands()\` / \`COMMANDS\` |\n\n`

  s += `## 6. Chemins rapides (\`cli.tsx\`, avant \`main.tsx\`)\n\n`
  s += `Ces branches évitent de charger tout le graphe de modules ; elles dépendent des feature flags \`bun:bundle\`.\n\n`
  s += `| Condition (résumé) | Comportement |\n|---------------------|--------------|\n`
  s += `| \`--version\` / \`-v\` / \`-V\` | Affiche la version (aucun autre import) |\n`
  s += `| \`--dump-system-prompt\` (flag build) | Prompt système puis sortie |\n`
  s += `| \`argv[2] === '--claude-in-chrome-mcp'\` | Serveur MCP Chrome |\n`
  s += `| \`argv[2] === '--chrome-native-host'\` | Hôte natif Chrome |\n`
  s += `| \`--computer-use-mcp\` (flag) | Serveur MCP computer-use |\n`
  s += `| \`--daemon-worker <kind>\` | Worker daemon |\n`
  s += `| \`remote-control\` / \`rc\` / \`remote\` / \`sync\` / \`bridge\` (flag) | \`bridgeMain\` |\n`
  s += `| \`daemon\` (flag) | \`daemonMain\` |\n`
  s += `| \`ps\` / \`logs\` / \`attach\` / \`kill\` / \`--bg\` (flag) | Sessions arrière-plan (\`cli/bg.js\`) |\n`
  s += `| \`new\` / \`list\` / \`reply\` (flag templates) | Jobs modèles |\n`
  s += `| \`environment-runner\` (flag) | BYOC runner |\n`
  s += `| \`self-hosted-runner\` (flag) | Runner self-hosted |\n`
  s += `| \`--tmux\` + \`--worktree\` | Exécution tmux worktree |\n\n`

  s += `## 7. Sous-commandes Commander (\`main.tsx\` → \`program\`)\n\n`
  s += `Commande racine : \`program.name(CLI_PROGRAM_NAME)\` — session interactive par défaut ; argument optionnel \`[prompt]\`.\n\n`
  s += `### Arborescence (sous-commandes déclarées)\n\n`
  s += `- **(défaut)** — action principale : REPL / \`--print\` selon options.\n`
  s += `- \`mcp\` → \`serve\`, \`remove <name>\`, \`list\`, \`get <name>\`, \`add-json <name> <json>\`, \`add-from-claude-desktop\`, \`reset-project-choices\`\n`
  s += `- \`server\` (feature \`DIRECT_CONNECT\`) — serveur de sessions HTTP/socket.\n`
  s += `- \`ssh <host> [dir]\` — SSH distant.\n`
  s += `- \`open <cc-url>\` — client cc:// (interne).\n`
  s += `- \`auth\` → \`login\`, \`status\`, \`logout\`\n`
  s += `- \`plugin\` (alias \`plugins\`) → \`validate\`, \`list\`, \`marketplace\` (\`add\`, \`list\`, \`remove\`, \`update\`), \`install\`, \`uninstall\`, \`enable\`, \`disable\`, \`update\`\n`
  s += `- \`setup-token\`\n`
  s += `- \`agents\`\n`
  s += `- \`auto-mode\` (flag) → \`defaults\`, \`config\`, \`critique\`\n`
  s += `- \`remote-control\` (alias \`rc\`, feature, souvent masqué) — enregistré pour l’aide ; exécution réelle via \`cli.tsx\`.\n`
  s += `- \`assistant [sessionId]\` (feature \`KAIROS\`)\n`
  s += `- \`doctor\`\n`
  s += `- \`update\` (alias \`upgrade\`)\n`
  s += `- \`up\`, \`rollback\`, \`log\`, \`error\`, \`export\`, \`task\`… — blocs \`[ANT-ONLY]\` / \`"external" === 'ant'\` (souvent absents des builds externes).\n`
  s += `- \`install [target]\` — installation binaire native.\n`
  s += `- \`completion <shell>\` (masqué, ant-only selon bloc).\n\n`

  s += `## 8. Commandes slash REPL (\`/\` dans le TUI)\n\n`

  s += `### 8.1 Noms et alias utilisables (runtime — \`builtInCommandNames()\`)\n\n`
  s += `Ensemble **trié** des chaînes reconnues comme commande slash : \`command.name\` et chaque entrée de \`command.aliases\` (\`src/commands.ts\`, même logique que l’autocomplétion). `
  s += `Généré en exécutant \`bun -e "import { builtInCommandNames } from './src/commands.ts'…"\` avec \`NODE_ENV=test\` et \`ANTHROPIC_API_KEY\` factice (requis car \`login()\` est évalué à l’construction du tableau).\n\n`
  s += `**Note :** les commandes derrière \`feature('…')\` absentes du bundle actuel (\`bun:bundle\`) ne figurent pas. Les skills répertoires / plugins / MCP ajoutent d’autres \`/\` à l’exécution.\n\n`
  if (slash.ok) {
    s += slash.names.map((n) => `- \`/${n}\``).join('\n')
    s += `\n\n*(Total : ${slash.names.length} noms et alias.)*\n\n`
  } else {
    s += `> **Échec** de l’extraction via Bun — installer Bun ou lancer depuis la racine du dépôt. Détail :\n>\n`
    s += `> \`\`\`text\n> ${slash.error.replace(/\n/g, '\n> ')}\n> \`\`\`\n\n`
  }

  s += `### 8.2 Identifiants du tableau \`COMMANDS\` (analyse statique de \`commands.ts\`)\n\n`
  s += `Symboles listés dans \`const COMMANDS = memoize((): Command[] => [\` … \`])\` (noms de variables TypeScript, pas forcément égaux au \`name:\` du \`Command\`). `
  s += `Les entrées conditionnelles (\`…(webCmd ? [webCmd] : [])\`, etc.) n’apparaissent que si la ligne est un identifiant simple.\n\n`
  s += replIds.map((id) => `- \`${id}\``).join('\n')
  s += `\n\n`

  s += `## 9. Routes HTTP web\n\n`
  s += `Le front web / serveur PTY web est retiré du périmètre du fork terminal-only.\n\n`

  s += `## 10. Fonctions d’entrée notables (références)\n\n`
  s += `| Symbole | Fichier |\n|---------|---------|\n`
  s += `| \`main()\` (async, charge \`main.tsx\`) | \`src/entrypoints/cli.tsx\` |\n`
  s += `| \`run()\` (parse Commander) | \`src/main.tsx\` |\n`
  s += `| \`getCommands()\` | \`src/commands.ts\` |\n`
  s += `| \`bridgeMain\` | \`src/bridge/bridgeMain.ts\` (via dynamic import) |\n`
  s += `| \`startServer\` / session HTTP | \`src/server/server.ts\` (via \`mcp serve\` / \`server\`) |\n\n`

  return s
}

main()
