import type { Command } from '../../types/command.js'

const fork = {
	type: 'local-jsx',
	name: 'fork',
	description: 'Fork command is unavailable in this fork',
	isEnabled: () => false,
	isHidden: true,
	load: () => import('../status/status.js'),
} satisfies Command

export default fork
