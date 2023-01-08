import {SavableDataObjectModel} from "./DataObjectModel";
import {IIDable} from "../interfaces/IIDable";
import {ISavableStore} from "../interfaces/ISavableStore";
import {action, computed, makeObservable, observable} from "mobx";
import {DataObject} from "./DataObject";
import {HTTPStatusError} from "../errors";
import {IPlayer, IPlayerData} from "../interfaces/IPlayer";

export class Player extends SavableDataObjectModel implements IPlayer, IIDable {
    get x(): number  {
        return this.getData('x');
    }

    set x(value: number) {
        this.setData('x', value);
    }
    get y(): number  {
        return this.getData('y');
    }

    set y(value: number) {
        this.setData('y', value);
    }

    get label(): string {
        return this.getData('label');
    }

    set label(value: string) {
        this.setData('label', value);
    }

    get teamcolor(): string {
        return this.getData('teamcolor');
    }

    set teamcolor(value: string) {
        this.setData('teamcolor', value);
    }


    constructor(data: IPlayerData) {
        super(data);
        this.dataInternal = new Map(Object.entries(data).filter(([key, _]) => key !== 'id' ).map(([k, v]) => {
            return [k, new DataObject(v)];
        }));


        makeObservable<Player>(this, {
            dataInternal: observable,
            x: computed,
            y: computed,
            label: computed,
            teamcolor: computed,
        });
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

    static buildData(dat: Record<string, any>): IPlayerData {
        return {
            id: dat.id,
            x: dat.x,
            y: dat.y,
            teamcolor: dat.teamcolor,
            label: dat.label,
        }
    }

    static buildPlayer(dat: Record<string, any>): Player {
        return new Player(Player.buildData(dat));
    }


    // @ts-ignore
    mergeMe(newPlayer: Mandate,
            overwrite_modified:boolean=true,
            forced:boolean=false) {
        // @ts-ignore
        super.mergeMe(newPlayer, overwrite_modified, forced);


    }

}