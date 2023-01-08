export type PrimitiveTy = boolean | number | string | void | null;

export type PlainArrayTy = Array<PrimitiveTy | PlainJsonTy | PlainArrayTy>
export type ReadOnlyPlainArrayTy = $ReadOnlyArray<PrimitiveTy | ReadOnlyPlainJsonTy | ReadOnlyPlainArrayTy>

export type PlainJsonTy = {
    [string]: (PrimitiveTy | PlainArrayTy | PlainJsonTy)
}
export type ReadOnlyPlainJsonTy = $ReadOnly<{
    [string]: (PrimitiveTy | ReadOnlyPlainArrayTy | ReadOnlyPlainJsonTy)
}>
