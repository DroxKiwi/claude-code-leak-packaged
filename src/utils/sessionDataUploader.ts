export async function uploadSessionData(): Promise<void> {}

export function createSessionTurnUploader() {
	return {
		upload: async () => {},
		stop: () => {},
	}
}
