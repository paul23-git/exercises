import {ISavable} from "./ISavable";
import {IPlayer, IPlayerData} from "./IPlayer";
import {IField, IFieldData} from "./IField";





export interface IExerciseData {
    id: string|number;
    name: string;
    players: Map<string|number, IPlayerData>,
    field: IFieldData
}

// @ts-ignore
export interface IExercise extends IExerciseData, ISavable {
    players: Map<string|number, IPlayer>,
    readonly field: IField;
    getPlayer(id: string|number): IPlayer|undefined
    addPlayer(player: IPlayer): void,
    removePlayer(id: string|number): void,
    mergeMe(newExercise: IExercise,
            overwrite_modified:boolean,
            forced:boolean): void,
}