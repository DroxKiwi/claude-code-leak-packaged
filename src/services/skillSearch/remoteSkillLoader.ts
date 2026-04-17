/** Chargement des skills distants — stub fork. */
export function stripCanonicalPrefix(name: string): string {
	return name
}

export async function loadRemoteSkill(_slug: string, _url: string): Promise<never> {
	throw new Error('Remote skill search is not available in this build.')
}

export function logRemoteSkillLoaded(_payload: Record<string, unknown>): void {}
