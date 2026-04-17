import type { Command } from '../../types/command.js'

const buddy = {
	type: 'local-jsx',
	name: 'buddy',
	description: 'Buddy command is unavailable in this fork',
	isEnabled: () => false,
	isHidden: true,
	load: () => import('../status/status.js'),
} satisfies Command

export default buddy
