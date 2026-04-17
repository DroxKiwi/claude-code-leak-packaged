declare module '@aws-sdk/client-bedrock' {
	export class BedrockClient {
		constructor(config?: Record<string, unknown>)
		send(command: unknown): Promise<any>
	}

	export class ListInferenceProfilesCommand {
		constructor(input?: Record<string, unknown>)
	}

	export class GetInferenceProfileCommand {
		constructor(input?: Record<string, unknown>)
	}
}

declare module '@aws-sdk/client-bedrock-runtime' {
	export type CountTokensCommandInput = Record<string, unknown>

	export class CountTokensCommand {
		constructor(input: CountTokensCommandInput)
	}

	export class BedrockRuntimeClient {
		constructor(config?: Record<string, unknown>)
		send(command: unknown): Promise<{ inputTokens?: number | null }>
	}
}

declare module '@smithy/node-http-handler' {
	export class NodeHttpHandler {
		constructor(config?: Record<string, unknown>)
	}
}

declare module '@smithy/core' {
	export class NoAuthSigner {
		constructor()
	}
}

declare module '@aws-sdk/client-sts' {
	export class STSClient {
		constructor(config?: Record<string, unknown>)
		send(command: unknown): Promise<unknown>
	}

	export class GetCallerIdentityCommand {
		constructor(input?: Record<string, unknown>)
	}
}

declare module '@aws-sdk/credential-providers' {
	export function fromIni(_opts?: Record<string, unknown>): () => Promise<unknown>
}

declare module '@aws-sdk/credential-provider-node' {
	export function defaultProvider(_opts?: Record<string, unknown>): () => Promise<unknown>
}
