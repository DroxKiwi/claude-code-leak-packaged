/**
 * Erreurs HTTP / réseau alignées sur l’ancien @anthropic-ai/sdk/error,
 * pour que le code existant (instanceof, champs status/headers/error) reste valide sans dépendre du SDK.
 */

function castToError(err: unknown): Error {
	if (err instanceof Error) return err
	return new Error(String(err))
}

export class AnthropicError extends Error {}

export class APIError<
	TStatus extends number | undefined = number | undefined,
	THeaders extends globalThis.Headers | undefined = globalThis.Headers | undefined,
	TError extends object | undefined = object | undefined,
> extends AnthropicError {
	readonly status: TStatus
	readonly headers: THeaders
	readonly error: TError
	readonly request_id: string | null | undefined

	constructor(status: TStatus, error: TError, message: string | undefined, headers: THeaders) {
		super(APIError.makeMessage(status, error, message))
		this.status = status
		this.headers = headers
		this.error = error
		this.request_id = headers?.get?.('request-id') ?? undefined
	}

	/** Alias utilisé par le code applicatif (aligné sur d’anciennes typings). */
	get requestID(): string | null | undefined {
		return this.request_id
	}

	private static makeMessage(
		status: number | undefined,
		error: { message?: unknown } | undefined,
		message: string | undefined,
	): string {
		const msg = error?.message
			? typeof error.message === 'string'
				? error.message
				: JSON.stringify(error.message)
			: error
				? JSON.stringify(error)
				: message
		if (status && msg) {
			return `${status} ${msg}`
		}
		if (status) {
			return `${status} status code (no body)`
		}
		if (msg) {
			return msg
		}
		return '(no status code or body)'
	}

	static generate(
		status: number | undefined,
		errorResponse: object | undefined,
		message: string | undefined,
		headers: globalThis.Headers | undefined,
	): APIError {
		if (!status || !headers) {
			return new APIConnectionError({
				message,
				cause: castToError(errorResponse),
			})
		}
		const error = errorResponse as object
		if (status === 400) {
			return new BadRequestError(status, error, message, headers)
		}
		if (status === 401) {
			return new AuthenticationError(status, error, message, headers)
		}
		if (status === 403) {
			return new PermissionDeniedError(status, error, message, headers)
		}
		if (status === 404) {
			return new NotFoundError(status, error, message, headers)
		}
		if (status === 409) {
			return new ConflictError(status, error, message, headers)
		}
		if (status === 422) {
			return new UnprocessableEntityError(status, error, message, headers)
		}
		if (status === 429) {
			return new RateLimitError(status, error, message, headers)
		}
		if (status >= 500) {
			return new InternalServerError(status, error, message, headers)
		}
		return new APIError(status, error, message, headers)
	}
}

export class APIUserAbortError extends APIError<undefined, undefined, undefined> {
	constructor({ message }: { message?: string } = {}) {
		super(undefined, undefined, message || 'Request was aborted.', undefined)
		this.name = 'APIUserAbortError'
	}
}

export class APIConnectionError extends APIError<undefined, undefined, undefined> {
	constructor({
		message,
		cause,
	}: {
		message?: string | undefined
		cause?: Error | undefined
	}) {
		super(undefined, undefined, message || 'Connection error.', undefined)
		this.name = 'APIConnectionError'
		if (cause) {
			;(this as Error & { cause?: Error }).cause = cause
		}
	}
}

export class APIConnectionTimeoutError extends APIConnectionError {
	constructor({ message }: { message?: string } = {}) {
		super({ message: message ?? 'Request timed out.' })
		this.name = 'APIConnectionTimeoutError'
	}
}

export class BadRequestError extends APIError<400, globalThis.Headers, object> {}

export class AuthenticationError extends APIError<401, globalThis.Headers, object> {}

export class PermissionDeniedError extends APIError<403, globalThis.Headers, object> {}

export class NotFoundError extends APIError<404, globalThis.Headers, object> {}

export class ConflictError extends APIError<409, globalThis.Headers, object> {}

export class UnprocessableEntityError extends APIError<422, globalThis.Headers, object> {}

export class RateLimitError extends APIError<429, globalThis.Headers, object> {}

export class InternalServerError extends APIError<number, globalThis.Headers, object> {}
