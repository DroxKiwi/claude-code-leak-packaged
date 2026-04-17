import { Text } from '../../ink.js'

type Props = {
	onComplete: (choice: 'merge' | 'keep' | 'replace') => void
	onCancel: () => void
}

export function buildMergePrompt(agentType: string, scope: string): string {
	return `Merge snapshot updates for ${agentType} (${scope}).`
}

export function SnapshotUpdateDialog(_props: Props) {
	return <Text dimColor={true}>Snapshot update</Text>
}
