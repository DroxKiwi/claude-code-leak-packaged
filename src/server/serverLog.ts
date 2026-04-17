export function serverLog(_message: string): void {}

export function createServerLogger() {
	return {
		info: (_message: string) => {},
		error: (_message: string) => {},
	}
}
