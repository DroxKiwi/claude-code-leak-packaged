import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js'
import type { StreamClientEvent } from './SSETransport.js'

/**
 * Contract for bidirectional session streaming used by {@link RemoteIO}.
 * Implemented by {@link WebSocketTransport}, {@link HybridTransport}, and {@link SSETransport}.
 */
export interface Transport {
	connect(): Promise<void>
	write(message: StdoutMessage): Promise<void>
	setOnData(callback: (data: string) => void): void
	setOnClose(callback: (closeCode?: number) => void): void
	/** Present on {@link SSETransport} for CCR delivery acks; optional elsewhere. */
	setOnEvent?(callback: (event: StreamClientEvent) => void): void
	isConnectedStatus(): boolean
	isClosedStatus(): boolean
	close(): void
}
