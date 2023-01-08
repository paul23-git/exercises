import {HTTPStatusError} from "../errors";
import {IDataObject} from "../interfaces/IDataObject";
import {makeObservable, observable} from "mobx";

export class DataObject<T> implements IDataObject<T> {
    current: T;
    old: T;
    changed: boolean;
    modifying: boolean;
    saveError: HTTPStatusError|undefined;

    constructor(value: T, old?: T|undefined) {
        this.current = value;
        this.old = old === undefined || old === null ? value : old;
        this.changed = old !== undefined && old !== null && old !== value;
        this.modifying = false;
        this.saveError =  undefined;

        makeObservable(this, {
            current: observable,
            old: observable,
            changed: observable,
            modifying: observable,
            saveError: observable,
        })
    }
    toJSON: (()=>string) = ():string => {
        return JSON.stringify(this.current);
    }
}