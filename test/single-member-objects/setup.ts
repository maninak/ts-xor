import { XOR } from './../../src'

interface A {
  a: string
}

interface B {
  b: string
}

export type A_XOR_B = XOR<A, B>
