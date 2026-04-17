export function startServer(..._args: unknown[]) {
	return {
		port: undefined as number | undefined,
		stop: (_force?: boolean) => {},
	}
}
