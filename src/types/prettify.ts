/**
 * Resolve mapped types and show the derived keys and their types when hovering in
 * VS Code, instead of just showing the names those mapped types are defined with.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
