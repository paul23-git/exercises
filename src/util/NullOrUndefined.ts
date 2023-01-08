
export function nullOrUndefined(val: unknown): val is null | undefined {
    return val === null || val === undefined;
}
