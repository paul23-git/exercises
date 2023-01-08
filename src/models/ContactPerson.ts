import {DataObjectModel, SavableDataObjectModel} from "./DataObjectModel";
import {IContactPersonData} from "../interfaces/ICustomer";
import {ISavable} from "../interfaces/ISavable";
import {IEditable} from "../interfaces/IEditable";
import {DataObject} from "./DataObject";
import {computed, makeObservable, observable} from "mobx";

export class ContactPerson extends DataObjectModel implements IContactPersonData, IEditable {
    get first_name(): string {
        return this.getData('first_name');
    }
    set first_name(value: string) {
        this.setData('first_name', value);
    }
    get sur_name(): string {
        return this.getData('sur_name');
    }
    set sur_name(value: string) {
        this.setData('sur_name', value);
    }
    get mobile_number(): string {
        return this.getData('mobile_number');
    }

    set mobile_number(value: string) {
        this.setData('mobile_number', value);
    }
    get email(): string {
        return this.getData('email');
    }

    set email(value: string) {
        this.setData('email', value);
    }

    constructor(dat: IContactPersonData) {
        super();
        this.dataInternal = new Map(Object.entries(dat).map(([k, v]) => {
            return [k, new DataObject(v)];
        }));
        makeObservable(this, {
            dataInternal: observable,
            first_name: computed,
            sur_name: computed,
            mobile_number: computed,
            email: computed,
        });
    }
}