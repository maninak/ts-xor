import { XOR } from './../../src'

interface A {
  a: string
}

interface B {
  b: string
}

let A_XOR_B: XOR<A, B>

A_XOR_B = { a: '', b: '' } // fails
