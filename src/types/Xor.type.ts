type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]
  ?
  : never
}


/**
 * Returns a type composed with T and U, restricting usage of either
 * exclusively to members of T or exclusively to members of U.
 *
 * No unique members of T can be used simultaneusly with any
 * unique members of U.
 *
 * Example:
 * `const myVar: XOR<T, U>`
 *
 * More: https://github.com/maninak/ts-xor/tree/master#description
 */
export type XOR<T, U> = (T | U) extends object
  ? (Without<T, U> & U)
  | (Without<U, T> & T) : T | U
