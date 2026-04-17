/**
 * Stub for @anthropic-ai/sandbox-runtime (internal Anthropic package).
 * Declares sandbox unsupported so the CLI runs; wrapWithSandbox is a no-op passthrough.
 */
import { z } from 'zod'

export type NetworkHostPattern = { host: string; port?: number }

export type SandboxAskCallback = (hostPattern: NetworkHostPattern) => Promise<boolean>

export type SandboxDependencyCheck = {
	errors: string[]
	warnings: string[]
}

export type SandboxViolationEvent = {
	type: string
	timestamp?: string
	message?: string
}

export type IgnoreViolationsConfig = Record<string, unknown> | undefined

export type FsReadRestrictionConfig = {
	denyOnly: string[]
	allowWithinDeny?: string[]
}

export type FsWriteRestrictionConfig = {
	allowOnly: string[]
	denyWithinAllow: string[]
}

export type NetworkRestrictionConfig = {
	allowedHosts?: string[]
	deniedHosts?: string[]
}

/** Loosely typed — real runtime validates more fields. */
export type SandboxRuntimeConfig = Record<string, unknown>

export const SandboxRuntimeConfigSchema = z.record(z.unknown()) as z.ZodType<SandboxRuntimeConfig>

export class SandboxViolationStore {
	private readonly violations: SandboxViolationEvent[] = []
	private readonly subs = new Set<(all: SandboxViolationEvent[]) => void>()

	subscribe(cb: (allViolations: SandboxViolationEvent[]) => void): () => void {
		cb([...this.violations])
		this.subs.add(cb)
		return () => {
			this.subs.delete(cb)
		}
	}

	getTotalCount(): number {
		return this.violations.length
	}
}

const violationStore = new SandboxViolationStore()

/**
 * Minimal stand-in for sandbox-runtime’s SandboxManager (static API).
 */
export class SandboxManager {
	static checkDependencies(_opts: {
		command: string
		args: string[]
	}): SandboxDependencyCheck {
		return {
			errors: [],
			warnings: [
				'Sandbox runtime package is not bundled in this build — OS sandbox (bubblewrap/seccomp) is unavailable.',
			],
		}
	}

	static isSupportedPlatform(): boolean {
		return false
	}

	static async wrapWithSandbox(
		command: string,
		_binShell?: string,
		_customConfig?: Partial<SandboxRuntimeConfig>,
		_abortSignal?: AbortSignal,
	): Promise<string> {
		return command
	}

	static async initialize(_config: SandboxRuntimeConfig, _cb?: SandboxAskCallback): Promise<void> {}

	static updateConfig(_config: SandboxRuntimeConfig): void {}

	static async reset(): Promise<void> {}

	static getFsReadConfig(): FsReadRestrictionConfig {
		return { denyOnly: [] }
	}

	static getFsWriteConfig(): FsWriteRestrictionConfig {
		return { allowOnly: [], denyWithinAllow: [] }
	}

	static getNetworkRestrictionConfig(): NetworkRestrictionConfig {
		return {}
	}

	static getIgnoreViolations(): IgnoreViolationsConfig {
		return undefined
	}

	static getAllowUnixSockets(): string[] | undefined {
		return undefined
	}

	static getAllowLocalBinding(): boolean | undefined {
		return undefined
	}

	static getEnableWeakerNestedSandbox(): boolean | undefined {
		return undefined
	}

	static getProxyPort(): number | undefined {
		return undefined
	}

	static getSocksProxyPort(): number | undefined {
		return undefined
	}

	static getLinuxHttpSocketPath(): string | undefined {
		return undefined
	}

	static getLinuxSocksSocketPath(): string | undefined {
		return undefined
	}

	static async waitForNetworkInitialization(): Promise<boolean> {
		return true
	}

	static getSandboxViolationStore(): SandboxViolationStore {
		return violationStore
	}

	static annotateStderrWithSandboxFailures(_command: string, stderr: string): string {
		return stderr
	}

	static cleanupAfterCommand(): void {}
}
