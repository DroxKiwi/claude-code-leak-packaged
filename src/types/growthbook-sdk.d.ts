/**
 * Surface minimale du SDK GrowthBook pour `import()` dynamique sans dépendance
 * obligatoire dans `package.json` (peer optional — fork Drox).
 */
declare module '@growthbook/growthbook' {
  export class GrowthBook {
    constructor(options: Record<string, unknown>)
    init(options: { timeout: number }): Promise<{ source: string; success: boolean }>
    getPayload(): { features?: Record<string, unknown> } | undefined
    setPayload(payload: Record<string, unknown>): Promise<void>
    getFeatures(): Record<string, unknown> | undefined
    getFeatureValue<T>(key: string, defaultValue: T): T
    refreshFeatures(): Promise<void>
    destroy(): void
  }
}
