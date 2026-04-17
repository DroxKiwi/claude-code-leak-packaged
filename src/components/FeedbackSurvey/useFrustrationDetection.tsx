import { useCallback, useState } from 'react'

/** Ant-only dogfooding hook; stub surface for external fork typecheck. */
export function useFrustrationDetection(..._args: unknown[]): {
	state: 'closed' | 'open'
	handleTranscriptSelect: () => void
} {
	const [state] = useState<'closed' | 'open'>('closed')
	const handleTranscriptSelect = useCallback(() => {}, [])
	return { state, handleTranscriptSelect }
}
