import { XOR } from './../../src'

interface A {
  a: string
}

interface B {
  b: string
}

interface C {
  c: string
}

export type A_XOR_B_XOR_C = XOR<A, XOR<B, C>>
