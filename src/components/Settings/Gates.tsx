import type * as React from 'react'

type Props = {
	onOwnsEscChange: (owns: boolean) => void
	contentHeight: number
}

/** Onglet Gates réservé aux builds internes ; UI minimale si activé. */
export function Gates(_props: Props): React.ReactNode {
	return null
}
