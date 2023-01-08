
import {ISavable} from "./ISavable";

export interface IFieldData {
    id: string|number;
    width: number;
    height: number;
    backgroundColor: string|null|undefined;
    backgroundImage: string|null|undefined;
}

export interface IField extends  IFieldData, ISavable {
    mergeMe(newField: IField,
            overwrite_modified:boolean,
            forced:boolean): void,

}