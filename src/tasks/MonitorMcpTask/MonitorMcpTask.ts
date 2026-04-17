import type { TaskStateBase } from '../../Task.js'

export type MonitorMcpTask = TaskStateBase & {
	type: 'monitor_mcp'
}

export type MonitorMcpTaskState = MonitorMcpTask

export async function killMonitorMcpTasksForAgent(
	_agentId: unknown,
	_getAppState: unknown,
	_setAppState: unknown,
): Promise<void> {}
