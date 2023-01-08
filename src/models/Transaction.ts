import {SavableDataObjectModel} from "./DataObjectModel";
import {ISavable} from "../interfaces/ISavable";
import {IIDable} from "../interfaces/IIDable";
import {ITransaction, ITransactionData} from "../interfaces/ITransaction";
import {computed, makeObservable, observable} from "mobx";
import {ISavableStore} from "../interfaces/ISavableStore";
import {HTTPStatusError} from "../errors";
import {MandateStore} from "../stores/MandateStore";
import {IMandate} from "../interfaces/IMandate";
import {DataObject} from "./DataObject";


export class Transaction extends SavableDataObjectModel implements ITransaction, ISavable, IIDable {
    get amount(): string | number {
        return this.getData('amount');
    }

    set amount(value: string | number) {
        this.setData('amount', value);
    }

    get contract_id(): number {
        return this.getData('contract_id');
    }

    set contract_id(value: number) {
        this.setData('contract_id', value);
    }

    get date(): Date {
        return this.getData('date');
    }

    set date(value: Date) {
        this.setData('date', value);
    }

    get mandate(): number {
        return this.getData('mandate');
    }

    set mandate(value: number) {
        this.setData('mandate', value);
    }

    get message(): string | null {
        return this.getData('message');
    }

    set message(value: string | null) {
        this.setData('message', value);
    }

    get place(): string | null {
        return this.getData('place');
    }

    set place(value: string | null) {
        this.setData('place', value);
    }

    get ref(): string | null {
        return this.getData('ref');
    }

    set ref(value: string | null) {
        this.setData('ref', value);
    }

    get refase2e(): boolean {
        return this.getData('refase2e');
    }

    set refase2e(value: boolean) {
        this.setData('refase2e', value);
    }

    get reqcolldt(): Date | null {
        return this.getData('reqcolldt');
    }

    set reqcolldt(value: Date | null) {
        this.setData('reqcolldt', value);
    }

    get state(): string {
        return this.getData('state');
    }

    set state(value: string) {
        this.setData('state', value);
    }

    get twikey_id(): number {
        return this.getData('twikey_id');
    }

    set twikey_id(value: number) {
        this.setData('twikey_id', value);
    }


    constructor(data: ITransactionData) {
        super(data);
        this.dataInternal = new Map(Object.entries(data).filter(([key, _]) => key !== 'id').map(([k, v]) => {
            return [k, new DataObject(v)];
        }));

        makeObservable<Transaction>(this, {
            dataInternal: observable,
            amount: computed,
            contract_id: computed,
            date: computed,
            message: computed,
            place: computed,
            ref: computed,
            refase2e: computed,
            reqcolldt: computed,
            state: computed,
            twikey_id: computed,
        });
    }

    async requestSaveMe(store: MandateStore, fieldname: string): Promise<void> {
        try {
            await store.saveTransactionData(this, fieldname);
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

    static buildData(dat: Record<string, any>): ITransactionData {
        return {
            amount: dat.amount,
            contract_id: dat.contract_id,
            date: new Date(dat.date),
            id: dat.id,
            mandate: dat.mandate,
            message: dat.message,
            place: dat.place,
            ref: dat.ref,
            refase2e: dat.refase2e,
            reqcolldt: dat.reqcolldt ? new Date(dat.reqcolldt) : null,
            state: dat.state,
            twikey_id: dat.twikey_id,
        }
    }

    static buildTransaction(dat: Record<string, any>): Transaction {
        return new Transaction(Transaction.buildData(dat));
    }

}