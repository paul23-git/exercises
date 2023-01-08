import {SavableDataObjectModel} from "./DataObjectModel";
import {IIDable} from "../interfaces/IIDable";
import {computed, makeObservable, observable} from "mobx";
import {DataObject} from "./DataObject";
import {HTTPStatusError} from "../errors";
import {IField, IFieldData} from "../interfaces/IField";
import {ExerciseStore} from "../stores/ExerciseStore";

export class Field extends SavableDataObjectModel implements IField, IIDable {
    get width(): number  {
        return this.getData('width');
    }

    set width(value: number) {
        this.setData('width', value);
    }
    get height(): number  {
        return this.getData('height');
    }

    set height(value: number) {
        this.setData('height', value);
    }

    get proportion() {
        return this.height/this.width;
    }

    get backgroundColor(): string {
        return this.getData('backgroundColor');
    }


    set backgroundColor(value: string) {
        this.setData('backgroundColor', value);
    }

    get backgroundImage(): string {
        return this.getData('backgroundImage');
    }

    set backgroundImage(value: string) {
        this.setData('backgroundImage', value);
    }


    constructor(data: IFieldData) {
        super(data);
        this.dataInternal = new Map(Object.entries(data).filter(([key, _]) => key !== 'id' ).map(([k, v]) => {
            return [k, new DataObject(v)];
        }));

        makeObservable<Field>(this, {
            dataInternal: observable,
            width: computed,
            height: computed,
            proportion: computed,
            backgroundColor: computed,
            backgroundImage: computed,
        });
    }


    static buildData(dat: Record<string, any>): IFieldData {
        return {
            id: dat.id,
            width: dat.width,
            height: dat.height,
            backgroundColor: dat.backgroundColor,
            backgroundImage: dat.backgroundImage,
        }
    }

    static buildField(dat: Record<string, any>): Field {
        return new Field(Field.buildData(dat));
    }


    // @ts-ignore
    mergeMe(newField: Field,
            overwrite_modified:boolean=true,
            forced:boolean=false) {
        // @ts-ignore
        super.mergeMe(newField, overwrite_modified, forced);


    }


    async requestSaveMe(store: ExerciseStore, fieldname: string): Promise<void> {
        try {
            await store.saveFieldData(this, fieldname);
            this.markSaved(fieldname);
        } catch (err) {
            if (err instanceof HTTPStatusError) {
                this.markSaveError(fieldname, err);
                throw err;
            } else {
                throw err;
            }
        }
    }
}