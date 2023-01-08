import {IEditable} from "./IEditable";
import {HTTPStatusError} from "../errors";
import {ISavableStore} from "./ISavableStore";
import {DataObjectModel} from "../models/DataObjectModel";

export interface ISavable extends IEditable {
    id: string | number;

    requestSaveMe(store: ISavableStore, fieldname: string): Promise<void>;

    containsValidData<T>(fieldname: string, value: T): boolean;

    markSaved(fieldname: string): void;

    markSaveError(fieldname: string, err: HTTPStatusError): void;

    clearSaveError(fieldname: string): void;


}