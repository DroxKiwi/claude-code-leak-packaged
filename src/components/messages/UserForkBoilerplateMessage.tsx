import { Text } from '../../ink.js'

type Props = {
	addMargin?: boolean
	param: unknown
}

export function UserForkBoilerplateMessage(_props: Props) {
	return <Text dimColor={true}>Fork boilerplate message</Text>
}
