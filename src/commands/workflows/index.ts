import type { Command } from '../../types/command.js'

const workflows = {
	type: 'local-jsx',
	name: 'workflows',
	description: 'Workflow scripts are unavailable in this fork',
	isEnabled: () => false,
	isHidden: true,
	load: () => import('../status/status.js'),
} satisfies Command

export default workflows
