// @flow

import type {HTTPStatusError} from "../errors";
import type {IEditable} from "../interfaces/IEditable";
import {IDataObject} from "../interfaces/IDataObject";
import {ISavable} from "../interfaces/ISavable";
import {ISavableStore} from "../interfaces/ISavableStore";
import {IIDable} from "../interfaces/IIDable";
import {action, makeObservable} from "mobx";

export abstract class DataObjectModel implements IEditable {
    dataInternal: Map<string, IDataObject<any>> = new Map();
    protected constructor() {
        makeObservable(this, {
            setData: action,
            undoModified: action,
            undoAllModified: action,
            markEditing: action,
            markStopEditing: action,
            mergeMe: action,
            markSaved: action,
            markSaveError: action,
            clearSaveError: action,
            _markModified: action,
        })
    }

    getData(fieldname: string): any {
        const o = this.dataInternal.get(fieldname);
        if (!o) {
            return undefined;
        }
        return o.current;
    };
    getDataRaw(fieldname: string): any {
        return this.dataInternal.get(fieldname);
    }

    hasChanged(fieldname: string): boolean {
        const field = this.dataInternal.get(fieldname);
        return (!!field && field.changed)
    };
    hasAnyChanged(): boolean {
        for (const v of this.dataInternal.values()) {
            if (v && v.changed) {
                return true;
            }
        }
        return false;
    };
    getError(fieldname: string): undefined|HTTPStatusError {
        const field = this.dataInternal.get(fieldname);
        return field ? field.saveError : undefined;
    };
    _markModified(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field && !field.changed) {
            field.old = field.current;
            field.changed = true;
        }
    };
    undoModified(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field && field.changed) {
            field.current = field.old;
            field.changed = false;
        }
    };
    undoAllModified(): void {
        for (const v of this.dataInternal.values()) {
            if (v.changed) {
                v.current = v.old;
                v.changed = false;
            }
        }
    };
    markEditing(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field) {
            field.modifying = true;
        }
    };
    markStopEditing(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field) {
            field.modifying = false;
        }
    };

    mergeMe(other: any,
        overwrite_modified:boolean=true,
        forced:boolean=false) {
        for (const [key, value] of this.dataInternal.entries()) {
            const other_val = other.dataInternal.get(key);
            if (other_val && (forced || (!value.modifying && (overwrite_modified || !value.changed)))) {
                // @ts-ignore
                if (!global._.isEqual(value.current, other_val.current)) {
                    value.current = other_val;
                }
            }
        }
    };
    toJSON(): {[key: string]: any} {
        return Object.fromEntries(this.dataInternal);
    }
    markSaved(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field && field.changed) {
            field.changed = false;
            field.saveError = undefined;
        }
    };
    markSaveError(fieldname: string, err: HTTPStatusError): void{
        const field = this.dataInternal.get(fieldname);
        if (field) {
            field.saveError = err;
        }
    };
    clearSaveError(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field) {
            field.saveError = undefined;
        }
    };

    setData(fieldname: string, data: any): void {
        const field = this.dataInternal.get(fieldname);
        if (!field) {
            throw new Error("Field does not exist");
        }
        if (!field.changed) {
            field.changed = true;
            field.old = field.current;
        }
        field.current = data;
    }
}


export abstract class SavableDataObjectModel extends DataObjectModel implements ISavable, IIDable {
    id: string|number;
    protected constructor(data: { id: string|number }) {
        super();
        this.id = data.id;
    }
    abstract requestSaveMe(store: ISavableStore, fieldname: string): Promise<void>;
    containsValidData: (<T>(fieldname: string, value: T) => boolean) = <T>(fieldname: string, value: T): boolean => {
        throw new Error("Not implemented");
    };
    markSaved(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field && field.changed) {
            field.changed = false;
            field.saveError = undefined;
        }
    };
    markSaveError(fieldname: string, err: HTTPStatusError): void{
        const field = this.dataInternal.get(fieldname);
        if (field) {
            field.saveError = err;
        }
    };
    clearSaveError(fieldname: string): void {
        const field = this.dataInternal.get(fieldname);
        if (field) {
            field.saveError = undefined;
        }
    };

    mergeMe(other: any,
            overwrite_modified:boolean=true,
            forced:boolean=false): void {
        for (const [key, value] of this.dataInternal.entries()) {
            const other_val = other.dataInternal.get(key);
            if (other_val && (forced || (!value.modifying && (overwrite_modified || !value.changed)))) {
                // @ts-ignore
                if (!global._.isEqual(value.current, other_val.current)) {
                    value.current = other_val;
                    this.markSaved(key);
                }
            }
        }
    };
}
