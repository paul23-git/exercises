import {IDataObject} from "./IDataObject";

export interface IEditable {
    markEditing(field: string): void;

    markStopEditing(field: string): void;

    getData(fieldname: string): any;

    getDataRaw(fieldname: string): IDataObject<any>;

    undoModified(fieldname: string): void;

    undoAllModified(): void;

    hasChanged(fieldname: string): boolean;

    hasAnyChanged(): boolean;

    setData(fieldname: string, data: any): void;

    mergeMe(other: any,
            overwrite_modified:boolean,
            forced:boolean): void;
}