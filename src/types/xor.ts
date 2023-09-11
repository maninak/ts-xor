import { Prettify } from './prettify.js'
import { Without } from './without.js'

/**
 * Restrict using either exclusively the keys of T or exclusively the keys of U.
 *
 * No unique keys of T can be used simultaneously with any unique keys of U.
 *
 * Example:
 * `const myVar: XOR<T, U>`
 *
 * More: https://github.com/maninak/ts-xor/tree/master#description
 */
export type XOR<T, U> = (T | U) extends object
  ? (Prettify<Without<T, U> & U>) | (Prettify<Without<U, T> & T>)
  : T | U