export function createCachedMCState() {
	return { pinnedEdits: [] }
}

export function markToolsSentToAPI(_state) {}

export function resetCachedMCState(state) {
	state.pinnedEdits = []
}
