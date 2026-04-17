import type { Command } from '../../types/command.js'

const peers = {
	type: 'local-jsx',
	name: 'peers',
	description: 'Peers command is unavailable in this fork',
	isEnabled: () => false,
	isHidden: true,
	load: () => import('../status/status.js'),
} satisfies Command

export default peers
