import {HTTPStatusError} from "../errors";

export interface IDataObject<T> {
    current: T,
    old: T,
    changed: boolean,
    modifying: boolean,
    saveError: HTTPStatusError | undefined,
    saveFun?: (() => string) | undefined,
    toJSON?: () => string,
}