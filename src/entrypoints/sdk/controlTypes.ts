/**
 * Types du protocole control SDK — inférés des schémas Zod dans controlSchemas.ts.
 */
import type { z } from 'zod/v4'
import type {
	SDKControlCancelRequestSchema,
	SDKControlInitializeRequestSchema,
	SDKControlInitializeResponseSchema,
	SDKControlMcpSetServersResponseSchema,
	SDKControlPermissionRequestSchema,
	SDKControlReloadPluginsResponseSchema,
	SDKControlRequestInnerSchema,
	SDKControlRequestSchema,
	SDKControlResponseSchema,
	StdinMessageSchema,
	StdoutMessageSchema,
} from './controlSchemas.js'

type LazyInfer<F extends () => z.ZodTypeAny> = z.infer<ReturnType<F>>

export type SDKControlRequest = LazyInfer<typeof SDKControlRequestSchema>
export type SDKControlResponse = LazyInfer<typeof SDKControlResponseSchema>
export type SDKControlRequestInner = LazyInfer<typeof SDKControlRequestInnerSchema>
export type StdoutMessage = LazyInfer<typeof StdoutMessageSchema>
export type StdinMessage = LazyInfer<typeof StdinMessageSchema>
export type SDKControlCancelRequest = LazyInfer<typeof SDKControlCancelRequestSchema>
export type SDKControlInitializeRequest = LazyInfer<typeof SDKControlInitializeRequestSchema>
export type SDKControlInitializeResponse = LazyInfer<typeof SDKControlInitializeResponseSchema>
export type SDKControlMcpSetServersResponse = LazyInfer<
	typeof SDKControlMcpSetServersResponseSchema
>
export type SDKControlReloadPluginsResponse = LazyInfer<
	typeof SDKControlReloadPluginsResponseSchema
>
export type SDKControlPermissionRequest = LazyInfer<typeof SDKControlPermissionRequestSchema>

export type { SDKPartialAssistantMessage } from './coreTypes.generated.js'
