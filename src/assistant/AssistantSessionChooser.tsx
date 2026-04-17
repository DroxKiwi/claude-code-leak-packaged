import { Text } from '../ink.js'
import type { AssistantSession } from './sessionDiscovery.js'

type Props = {
	sessions: AssistantSession[]
	onSelect: (id: string) => void
	onCancel: () => void
}

export function AssistantSessionChooser(_props: Props) {
	return <Text dimColor={true}>Assistant session chooser</Text>
}
