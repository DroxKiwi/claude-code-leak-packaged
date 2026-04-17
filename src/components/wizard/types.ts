import type { ReactNode } from 'react'

export type WizardStepComponent<T extends Record<string, unknown> = Record<string, unknown>> = (
	props: {
		data: T
		updateData: (patch: Partial<T>) => void
	},
) => ReactNode

export type WizardContextValue<T extends Record<string, unknown> = Record<string, unknown>> = {
	data: T
	updateData: (patch: Partial<T>) => void
	currentStep: number
	setCurrentStep: (step: number) => void
	totalSteps: number
	onCancel: () => void
	onComplete: () => void
}

export type WizardProviderProps<T extends Record<string, unknown> = Record<string, unknown>> = {
	steps: WizardStepComponent<T>[]
	initialData?: T
	onComplete: () => void
	onCancel: () => void
	children?: ReactNode
	title?: string
	showStepCounter?: boolean
}
