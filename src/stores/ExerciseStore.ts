
import {ISavableStore} from "../interfaces/ISavableStore";
import {ISavable} from "../interfaces/ISavable";
import {IDataObject} from "../interfaces/IDataObject";
import {nullOrUndefined} from "../util/NullOrUndefined";
import {FetcherBase} from "../Fetchers/FetcherBase";
import {makeObservable, observable, ObservableMap} from "mobx";
import {Exercise} from "../models/Exercise";
import {TypeError} from "../errors/TypeError";
import {HTTPStatusError} from "../errors";
import {Player} from "../models/Player";
import {IExercise} from "../interfaces/IExercise";
const BASE_URL = process.env.REACT_APP_DYNAMIC_PATH || '';

export type PlayerCreateType = {
}

export class ExerciseStore implements ISavableStore {
    static exerciseUrl: string = '/exercise/';
    static playerUrl: string = '/player/';
    static fieldUrl: string = '/exercise/field/';
    conn: FetcherBase;
    exercises: Map<number|string, Exercise>;
    handleDataSaveError(err: Error, what: string): void {
    }


    async loadExercise(id: string|number) {
        try {
            // const dat = await this.conn.fetchData(
            //     BASE_URL + ExerciseStore.exerciseUrl + id.toString() + '/',
            //     {
            //         method: 'Get',
            //     }
            // );
            const dat = {
                id: id,
                name: 'test',
                players: [{
                    id: 1,
                    x: 100,
                    y: 100,
                    teamcolor: "red",
                    label: "A2",
                }],
                field: {
                    id: 1,
                    width: (55+2*2),
                    height: (91.4+2*6),
                    backgroundColor: "green",
                }
            }
            const newE = Exercise.buildExercise(dat);
            this.exercises.set(newE.id, newE);
        } catch (err) {
            if (err instanceof HTTPStatusError) {
                console.log("res not found")
            }
            throw err;
        } finally {
            //this.loadingList.delete(id);
        }
    }

    async createNewExercise(customer: string, ct: number|string, twikey_id?: string) {
        const dat = await this.conn.fetchData(
            BASE_URL + ExerciseStore.exerciseUrl,
            {
                method: 'post',
                body: {customer, ct: ct.toString(), twikey_id},
            }
        );
        const exercise = Exercise.buildExercise(dat);
        this._addExercise(exercise);
    }


    getExercise(id: string|number): Exercise|undefined {
        return this.exercises.get(id);
    }

    async createNewPlayer(exercise: IExercise, data: PlayerCreateType) {
        const exportData: Record<string, string> = {
        };
        const dat = await this.conn.fetchData(
            BASE_URL + ExerciseStore.playerUrl,
            {
                method: 'post',
                body: exportData,
            }
        )
        const player = Player.buildPlayer(dat);
        this._addPlayer(exercise, player);
    }


    constructor(conn: FetcherBase) {
        this.conn = conn;
        this.exercises = new Map();
        makeObservable(this,{
            exercises: observable,
        });
    }

    _removeExercise(id: number) {
        const m = this.exercises.get(id);
        if (!m) return;
        this.exercises.delete(id);
    }
    _addExercise(exercise: Exercise) {
        this.exercises.set(exercise.id, exercise);
    }
    _addPlayer(exercise: IExercise, player: Player) {
        exercise.addPlayer(player);
    }

    async saveDataRaw(id: string|number, fieldname: string, data: IDataObject<any>): Promise<void> {
        //const v = dataObject.getData(fieldname);
        if (data.changed && data.old !== data.current) {
            let val = data.saveFun ? data.saveFun() : data.current;
            if (nullOrUndefined(val)) {
                val = '';
            }
            await this.conn.fetchData(BASE_URL + ExerciseStore.exerciseUrl + id + '/' + fieldname, {
                method: 'POST',
                body: {
                    id: id.toString(),
                    value: val,
                }
            })
        }
    }
    async savePlayerDataRaw(id: string|number, fieldname: string, data: IDataObject<any>): Promise<void> {
        //const v = dataObject.getData(fieldname);
        if (data.changed && data.old !== data.current) {
            let val = data.saveFun ? data.saveFun() : data.current;
            if (nullOrUndefined(val)) {
                val = '';
            }
            await this.conn.fetchData(BASE_URL + ExerciseStore.playerUrl + id + '/' + fieldname, {
                method: 'POST',
                body: {
                    id: id.toString(),
                    value: val,
                }
            })
        }
    }
    async saveFieldDataRaw(id: string|number, fieldname: string, data: IDataObject<any>): Promise<void> {
        //const v = dataObject.getData(fieldname);
        if (data.changed && data.old !== data.current) {
            let val = data.saveFun ? data.saveFun() : data.current;
            if (nullOrUndefined(val)) {
                val = '';
            }
            await this.conn.fetchData(BASE_URL + ExerciseStore.fieldUrl + id + '/' + fieldname, {
                method: 'POST',
                body: {
                    id: id.toString(),
                    value: val,
                }
            })
        }
    }

    async saveData(dataObject: ISavable, fieldname: string): Promise<void> {
        await this.saveDataRaw(dataObject.id, fieldname, dataObject.getDataRaw(fieldname));
    }
    async savePlayerData(dataObject: ISavable, fieldname: string): Promise<void> {
        await this.savePlayerDataRaw(dataObject.id, fieldname, dataObject.getDataRaw(fieldname));
    }
    async saveFieldData(dataObject: ISavable, fieldname: string): Promise<void> {
        await this.saveFieldDataRaw(dataObject.id, fieldname, dataObject.getDataRaw(fieldname));
    }

}