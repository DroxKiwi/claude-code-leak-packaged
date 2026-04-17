export async function rollbackMain(): Promise<void> {}

export async function rollback(
	_target?: string,
	_options?: { list?: boolean; dryRun?: boolean; safe?: boolean },
): Promise<void> {}
