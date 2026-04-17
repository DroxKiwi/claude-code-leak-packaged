/** Stub session handle for fork / typecheck; real SSH UI is out of scope. */
export type SSHSession = Record<string, unknown>

export async function createSSHSession(..._args: unknown[]): Promise<Record<string, unknown>> {
	return {}
}

export class SSHSessionError extends Error {}

export async function createLocalSSHSession(..._args: unknown[]): Promise<Record<string, unknown>> {
	return {}
}
