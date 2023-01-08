import {ITransaction, ITransactionData} from "./ITransaction";
import {ISavable} from "./ISavable";
import {IPlayer, IPlayerData} from "./IPlayer";



export interface IExerciseData {
    id: string|number;
    name: string;
    players: Map<string|number, IPlayerData>,
}

// @ts-ignore
export interface IExercise extends IExerciseData, ISavable {
    players: Map<string|number, IPlayer>,
    addPLayer(transaction: IPlayer): void,
    removePlayer(id: string|number): void,
    mergeMe(newExercise: IExercise,
            overwrite_modified:boolean,
            forced:boolean): void,
}