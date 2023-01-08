import {ISavable} from "./ISavable";

export interface ISavableStore {
    saveData(dataObject:ISavable, fieldname: string): Promise<void>;
    handleDataSaveError(err: Error, what: string): void;
}