import {ISavable} from "./ISavable";



export interface IPlayerData {
    id: string|number;
    x: number;
    y: number,
    label: string;
    teamcolor: string;
}

// @ts-ignore
export interface IPlayer extends IPlayerData, ISavable {
    mergeMe(newPLayer: IPlayerData,
            overwrite_modified:boolean,
            forced:boolean): void,
}