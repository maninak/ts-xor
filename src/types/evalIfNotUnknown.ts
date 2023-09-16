 /**
  * Skip evaluating `U` if `T` is `unknown`.
  */
 export type EvalIfNotUnknown<T, U> = unknown extends T ? never : U;
