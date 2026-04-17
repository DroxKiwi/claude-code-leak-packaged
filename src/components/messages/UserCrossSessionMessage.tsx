import { Text } from '../../ink.js'

type Props = {
	addMargin?: boolean
	param: unknown
}

export function UserCrossSessionMessage(_props: Props) {
	return <Text dimColor={true}>Cross session message</Text>
}
