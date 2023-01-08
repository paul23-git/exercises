import {DataObjectModel, SavableDataObjectModel} from "./DataObjectModel";
import {IIDable} from "../interfaces/IIDable";
import {IExercise, IExerciseData} from "../interfaces/IExercise";
import {ISavableStore} from "../interfaces/ISavableStore";
import {action, computed, makeObservable, observable} from "mobx";
import {DataObject} from "./DataObject";
import {HTTPStatusError} from "../errors";
import {IContactPersonData} from "../interfaces/ICustomer";
import {IPlayer, IPlayerData} from "../interfaces/IPlayer";
import {Player} from "./Player";

export class Exercise extends SavableDataObjectModel implements IExercise, IIDable {
    private readonly _players: Map<string|number, IPlayer>;
    get players(): Map<string|number, IPlayer> {
        return this._players;
    }

    get name(): string {
        return this.getData('name');
    }

    set name(value: string) {
        this.setData('name', value);
    }

    constructor(data: IExerciseData) {
        super(data);
        this._players = new Map();
        for (const [id, p] of data.players) {
            this._players.set(id, new Player(p));
        }
        this.dataInternal = new Map(Object.entries(data).filter(([key, _]) => key !== 'id' && key !== 'transactions').map(([k, v]) => {
            return [k, new DataObject(v)];
        }));


        makeObservable<Exercise, '_players'>(this, {
            dataInternal: observable,
            _players: observable,
            players: computed,
            name: computed,
        });
    }

    addPlayer(player: IPlayer) {
        this._players.set(player.id, player);
    }

    async requestSaveMe(mandateStore: ISavableStore, fieldname: string): Promise<void> {
        try {
            await mandateStore.saveData(this, fieldname);
            this.markSaved(fieldname);
        } catch (err) {
            if (err instanceof HTTPStatusError) {
                this.markSaveError(fieldname, err);
            } else {
                throw err;
            }
        }
    }

    static buildData(dat: Record<string, any>): IExerciseData {
        //const p = (dat.players as Record<string, any>[]).map((t: Record<string, any>) => Transaction.buildData(t));
        const playerMap: Map<string|number, IPlayerData> = new Map();
        for (const p of dat.players) {
            const newp = Player.buildData(p)
            playerMap.set(newp.id, newp);
        }
        return {
            name: dat.name,
            id: dat.id,
            players: playerMap,
        }
    }

    static buildExercise(dat: Record<string, any>): Exercise {
        return new Exercise(Exercise.buildData(dat));
    }


    // @ts-ignore
    mergeMe(newExercise: Exercise,
            overwrite_modified:boolean=true,
            forced:boolean=false) {
        // @ts-ignore
        super.mergeMe(newExercise, overwrite_modified, forced);
        for (const newPlayer of newExercise._players.values()) {
            const tid = newPlayer.id;
            const oldPLayer: IPlayer|undefined = this._players.get(tid);
            if (oldPLayer) {
                oldPLayer.mergeMe(newPlayer, overwrite_modified, forced);
            } else {
                this.players.set(tid, newPlayer);
            }
        }

    }

}