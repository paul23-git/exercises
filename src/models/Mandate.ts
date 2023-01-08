import {DataObjectModel, SavableDataObjectModel} from "./DataObjectModel";
import {ISavable} from "../interfaces/ISavable";
import {IIDable} from "../interfaces/IIDable";
import {IMandate, IMandateData} from "../interfaces/IMandate";
import {ISavableStore} from "../interfaces/ISavableStore";
import {ITransaction} from "../interfaces/ITransaction";
import {action, computed, makeObservable, observable} from "mobx";
import {Transaction} from "./Transaction";
import {DataObject} from "./DataObject";
import {HTTPStatusError} from "../errors";
import {IContactPersonData} from "../interfaces/ICustomer";

export class Mandate extends SavableDataObjectModel implements IMandate, ISavable, IIDable {
    private readonly _transactions: ITransaction[];
    get transactions(): ITransaction[] {
        return this._transactions;
    }

    get ct(): number | null {
        return this.getData('ct');
    }

    set ct(value: number | null) {
        this.setData('ct', value);
    }

    get customer(): string | null {
        return this.getData('customer');
    }

    get twikey_id(): string | null {
        return this.getData('twikey_id');
    }

    set twikey_id(value: string | null) {
        this.setData('twikey_id', value);
    }

    get url(): string | null {
        return this.getData('url');
    }

    set url(value: string | null) {
        this.setData('url', value);
    }

    get hasPDF(): boolean {
        return this.getData('hasPDF');
    }
    get signed(): boolean {
        return this.getData("signed");
    }

    constructor(data: IMandateData) {
        super(data);
        this._transactions = data.transactions.map(t => new Transaction(t));
        this.dataInternal = new Map(Object.entries(data).filter(([key, _]) => key !== 'id' && key !== 'transactions').map(([k, v]) => {
            return [k, new DataObject(v)];
        }));


        makeObservable<Mandate, '_transactions'>(this, {
            dataInternal: observable,
            _transactions: observable,
            transactions: computed,
            ct: computed,
            customer: computed,
            twikey_id: computed,
            url: computed,
            hasPDF: computed,
            signed: computed,
            addTransaction: action,
        });
    }

    addTransaction(transaction: ITransaction) {
        this._transactions.push(transaction);
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

    static buildData(dat: Record<string, any>): IMandateData {
        const trans = (dat.transactions as Record<string, any>[]).map((t: Record<string, any>) => Transaction.buildData(t));
        return {
            ct: dat.ct,
            customer: dat.customer,
            id: dat.id,
            transactions: trans,
            twikey_id: dat.twikey_id,
            url: dat.url,
            hasPDF: !!dat.hasPDF,
            signed: !!dat.signed,
        }
    }

    static buildMandate(dat: Record<string, any>): Mandate {
        return new Mandate(Mandate.buildData(dat));
    }


    // @ts-ignore
    mergeMe(newMandate: Mandate,
            overwrite_modified:boolean=true,
            forced:boolean=false) {
        // @ts-ignore
        super.mergeMe(newMandate, overwrite_modified, forced);
        const toAdd: ITransaction[] = [];
        for (const newTransaction of newMandate._transactions) {
            const tid = newTransaction.id;
            const oldTransaction: ITransaction|undefined = this._transactions.find(t => t.id === tid);
            if (oldTransaction) {
                oldTransaction.mergeMe(newTransaction, overwrite_modified, forced);
            } else {
                toAdd.push(newTransaction);
            }
        }
        this._transactions.push(...toAdd);

    }

}