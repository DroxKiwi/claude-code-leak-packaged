/**
 * Hook prepare-commit-msg (upstream). Fork : no-op ; worktree.ts importe dynamiquement ce module.
 */
export async function installPrepareCommitMsgHook(
	_worktreePath: string,
	_worktreeHooksDir: string | undefined,
): Promise<void> {}
