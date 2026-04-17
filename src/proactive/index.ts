let proactiveActive = false
let proactivePaused = false

export function activateProactive(_source: 'command' | 'startup' | string = 'command'): void {
	proactiveActive = true
	proactivePaused = false
}

export function deactivateProactive(): void {
	proactiveActive = false
	proactivePaused = false
}

export function isProactiveActive(): boolean {
	return proactiveActive
}

export function isProactivePaused(): boolean {
	return proactivePaused
}

export function setProactivePaused(paused: boolean): void {
	proactivePaused = paused
}
