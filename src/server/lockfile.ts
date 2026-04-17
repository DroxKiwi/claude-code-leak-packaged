export async function withServerLock<T>(fn: () => Promise<T>): Promise<T> {
	return await fn()
}

export async function writeServerLock(_data: Record<string, unknown>): Promise<void> {}

export async function removeServerLock(): Promise<void> {}

export async function probeRunningServer(): Promise<{ pid: number; httpUrl: string } | null> {
	return null
}
