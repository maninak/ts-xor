import type { XOR } from '../../src'

interface A { a: string }
interface B { b: string }
interface C { c: string }
interface D { d: string }

export type XOR_A_B_C_D = XOR<A, B, C, D>
export type XOR_A_B_C_D_Nested = XOR<A, XOR<B, XOR<C,D>>>
