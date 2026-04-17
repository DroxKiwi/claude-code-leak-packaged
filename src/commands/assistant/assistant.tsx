import { Text } from '../../ink.js'

type NewInstallWizardProps = {
	defaultDir: string
	onInstalled: (dir: string) => void
	onCancel: () => void
	onError: (message: string) => void
}

export async function computeDefaultInstallDir(): Promise<string> {
	return '.assistant'
}

export function NewInstallWizard(_props: NewInstallWizardProps) {
	return <Text dimColor={true}>Assistant install wizard</Text>
}
