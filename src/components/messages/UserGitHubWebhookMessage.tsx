import { Text } from '../../ink.js'

type Props = {
	addMargin?: boolean
	param: unknown
}

export function UserGitHubWebhookMessage(_props: Props) {
	return <Text dimColor={true}>GitHub webhook message</Text>
}
