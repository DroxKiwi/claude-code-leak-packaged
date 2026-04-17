import figures from 'figures'
import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useTerminalSize } from '../hooks/useTerminalSize.js'
import { Box, Text } from '../ink.js'
import {
	getOllamaConnectionFromConfig,
	tryApplyOllamaConnection,
} from '../utils/ollamaConnection.js'
import TextInput from './TextInput.js'

type Step = 'host' | 'key' | 'model'

type Props = {
	onDone(): void
	startingMessage?: string
}

/**
 * Premier lancement : collecte URL Ollama, clé API optionnelle, modèle optionnel.
 * Remplace l’ancien flux OAuth (abonnement / Console / 3rd-party).
 */
export function OllamaSetupFlow({ onDone, startingMessage }: Props): ReactNode {
	const columns = Math.max(40, useTerminalSize().columns - 4)
	const defaults = useMemo(() => getOllamaConnectionFromConfig(), [])

	const [step, setStep] = useState<Step>('host')
	const [host, setHost] = useState(defaults.host)
	const [apiKey, setApiKey] = useState(defaults.apiKey)
	const [model, setModel] = useState(defaults.model)
	const [hostCursor, setHostCursor] = useState(host.length)
	const [keyCursor, setKeyCursor] = useState(apiKey.length)
	const [modelCursor, setModelCursor] = useState(model.length)
	const [error, setError] = useState<string | null>(null)
	const [busy, setBusy] = useState(false)

	const intro =
		startingMessage ??
		'Connexion au modèle via Ollama (serveur local ou distant). Aucun compte Anthropic requis.'

	const finish = useCallback(async () => {
		setError(null)
		setBusy(true)
		try {
			const result = await tryApplyOllamaConnection({ host, apiKey, model })
			if (!result.ok) {
				setError(result.message)
				setStep('host')
				setBusy(false)
				return
			}
			onDone()
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e))
		} finally {
			setBusy(false)
		}
	}, [host, apiKey, model, onDone])

	const onHostSubmit = useCallback(() => {
		setError(null)
		setStep('key')
	}, [])

	const onKeySubmit = useCallback(() => {
		setError(null)
		setStep('model')
	}, [])

	if (busy) {
		return (
			<Box flexDirection="column" gap={1} marginTop={1}>
				<Text color="cyan">Vérification de la connexion Ollama…</Text>
			</Box>
		)
	}

	return (
		<Box flexDirection="column" gap={1} marginTop={1}>
			<Text bold>{intro}</Text>
			{error ? (
				<Box flexDirection="column">
					<Text color="red">{error}</Text>
					<Text dimColor>Corrigez les valeurs ci-dessous puis validez à nouveau.</Text>
				</Box>
			) : null}

			{step === 'host' ? (
				<Box flexDirection="column" gap={1}>
					<Text>
						<Text bold>1. URL du serveur Ollama</Text>
						<Text dimColor> (ex. http://127.0.0.1:11434)</Text>
					</Text>
					<Box borderDimColor borderStyle="round" paddingLeft={1} marginY={1}>
						<TextInput
							showCursor
							focus
							value={host}
							onChange={setHost}
							onSubmit={onHostSubmit}
							placeholder={`http://127.0.0.1:11434${figures.ellipsis}`}
							columns={columns}
							cursorOffset={hostCursor}
							onChangeCursorOffset={setHostCursor}
						/>
					</Box>
					<Text dimColor>Entrée · étape suivante</Text>
				</Box>
			) : null}

			{step === 'key' ? (
				<Box flexDirection="column" gap={1}>
					<Text>
						<Text bold>2. Clé API</Text>
						<Text dimColor> (optionnel — proxy, tunnel, Ollama distant sécurisé)</Text>
					</Text>
					<Box borderDimColor borderStyle="round" paddingLeft={1} marginY={1}>
						<TextInput
							showCursor
							focus
							value={apiKey}
							onChange={setApiKey}
							onSubmit={onKeySubmit}
							placeholder="Laisser vide si aucune authentification"
							columns={columns}
							cursorOffset={keyCursor}
							onChangeCursorOffset={setKeyCursor}
							mask="*"
						/>
					</Box>
					<Text dimColor>Entrée · étape suivante</Text>
				</Box>
			) : null}

			{step === 'model' ? (
				<Box flexDirection="column" gap={1}>
					<Text>
						<Text bold>3. Modèle Ollama</Text>
						<Text dimColor> (optionnel — défaut llama3.2 si vide)</Text>
					</Text>
					<Box borderDimColor borderStyle="round" paddingLeft={1} marginY={1}>
						<TextInput
							showCursor
							focus
							value={model}
							onChange={setModel}
							onSubmit={() => void finish()}
							placeholder={`ex. llama3.2, qwen2.5-coder${figures.ellipsis}`}
							columns={columns}
							cursorOffset={modelCursor}
							onChangeCursorOffset={setModelCursor}
						/>
					</Box>
					<Text dimColor>Entrée · tester la connexion et enregistrer</Text>
				</Box>
			) : null}
		</Box>
	)
}
