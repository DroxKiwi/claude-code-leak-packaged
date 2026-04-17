/**
 * React 19 compiler runtime — stub types pour les builds sans le paquet dédié.
 */
declare module 'react/compiler-runtime' {
  /**
   * Compiler cache helper emitted by React compiler transforms.
   * Treat as permissive array storage in this fork to avoid typing noise
   * from generated cache slots.
   */
  export function c(...args: unknown[]): any[]
}
