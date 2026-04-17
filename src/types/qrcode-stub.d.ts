declare module 'qrcode' {
  export function toString(
    text: string,
    options?: Record<string, unknown>,
  ): Promise<string>
  export function toDataURL(
    text: string,
    options?: Record<string, unknown>,
  ): Promise<string>
  const qrcode: {
    toString: typeof toString
    toDataURL: typeof toDataURL
  }
  export default qrcode
}
