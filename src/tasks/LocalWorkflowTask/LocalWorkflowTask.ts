import type { TaskStateBase } from '../../Task.js'

export type LocalWorkflowTask = TaskStateBase & {
	type: 'local_workflow'
}

export type LocalWorkflowTaskState = LocalWorkflowTask
