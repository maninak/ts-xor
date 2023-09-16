import { XOR_A_B_C_D, XOR_A_B_C_D_Nested } from './setup'

// @ts-expect-error
const test: XOR_A_B_C_D = { c: '', d: '' }
// @ts-expect-error
const testNested: XOR_A_B_C_D_Nested = { c: '', d: '' }
