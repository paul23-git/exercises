import {ISavableStore} from "../interfaces/ISavableStore";
import {ISavable} from "../interfaces/ISavable";
import {IDataObject} from "../interfaces/IDataObject";
import {nullOrUndefined} from "../util/NullOrUndefined";
import {FetcherBase} from "../Fetchers/FetcherBase";
import {makeObservable, observable, ObservableMap} from "mobx";
import {Mandate} from "../models/Mandate";
import {TypeError} from "../errors/TypeError";
import {Customer} from "../models/Customer";
import {HTTPStatusError} from "../errors";
import {Transaction} from "../models/Transaction";
import {IMandate} from "../interfaces/IMandate";
const BASE_URL = process.env.REACT_APP_DYNAMIC_PATH || '';

export type TransactionCreateType = {
    amount: number;
    mandate: number|string;
    message: string;
    twikey_id?: string;
    ref?: string;
    place?: string;
    refase2e?: boolean;
    reqcolldt?: Date;
}

export class MandateStore implements ISavableStore {
    static mandateUrl: string = '/mandate/';
    static transactionUrl: string = '/transaction/';
    conn: FetcherBase;
    mandates: Map<number|string, Mandate>;
    customerMandates: Map<string|number, Map<number|string, Mandate>>;
    handleDataSaveError(err: Error, what: string): void {
    }


    async loadMandates(customer?: string|undefined, ct?: string|undefined) {
        try {
            const dat = await this.conn.fetchData(
                BASE_URL + MandateStore.mandateUrl,
                {
                    method: 'Get',
                    query: {
                        customer: customer || '',
                        ct: ct || '',
                    }
                }
            );
            if (!Array.isArray(dat)) {
                throw new TypeError()
            }
            for (const m of dat) {
                const mandate = Mandate.buildMandate(m);
                const old = this.mandates.get(mandate.id);
                if (!old) {
                    this._addMandate(mandate);
                } else {
                    old.mergeMe(mandate);
                }
            }
        } catch (err) {
            if (err instanceof HTTPStatusError) {
                console.log("res not found")
            }
            throw err;
        } finally {
            //this.loadingList.delete(id);
        }
    }

    async createNewMandate(customer: string, ct: number|string, twikey_id?: string) {
        const dat = await this.conn.fetchData(
            BASE_URL + MandateStore.mandateUrl,
            {
                method: 'post',
                body: {customer, ct: ct.toString(), twikey_id},
            }
        );
        const mandate = Mandate.buildMandate(dat);
        this._addMandate(mandate);
    }
    async createNewTransaction(mandate: IMandate, data: TransactionCreateType) {
        const exportData: Record<string, string> = {
            amount: data.amount.toString(10), mandate: data.mandate.toString(), message: data.message
        };
        if (data.ref) {
            exportData.ref = data.ref;
        }
        if (data.place) {
            exportData.place = data.place;
        }
        if (data.refase2e) {
            exportData.refase2e = '1';
        }

        if (data.reqcolldt) {
            exportData.reqcolldt = JSON.parse(JSON.stringify(data.reqcolldt));
        }

        const dat = await this.conn.fetchData(
            BASE_URL + MandateStore.transactionUrl,
            {
                method: 'post',
                body: exportData,
            }
        )
        const transaction = Transaction.buildTransaction(dat);
        this._addTransaction(mandate, transaction);
    }

    getMandatesFromCustomer(customer: string|number): Iterable<Mandate> {
        const m = this.customerMandates.get(customer);
        if (!m) {
            return [];
        }
        return m.values();
    }


    constructor(conn: FetcherBase) {
        this.conn = conn;
        this.mandates = new Map();
        this.customerMandates = new Map();
        this.conn = conn;
        makeObservable(this,{
            mandates: observable,
            customerMandates: observable,
        });
    }

    _removeMandate(id: number) {
        const m = this.mandates.get(id);
        if (!m) return;
        const cid = m.customer;
        this.mandates.delete(id);
        if (cid) {
            const customerMandates = this.customerMandates.get(cid);
            if (customerMandates) {
                customerMandates.delete(id);
            }
        }
    }
    _addMandate(mandate: Mandate) {
        this.mandates.set(mandate.id, mandate);
        const cid = mandate.customer;
        if (cid) {
            const customerMandates = this.customerMandates.get(cid);
            if (!customerMandates) {
                const newMap = new ObservableMap([[mandate.id, mandate]]);
                this.customerMandates.set(cid, newMap);
            } else {
                customerMandates.set(mandate.id, mandate);
            }
        }
    }
    _addTransaction(mandate: IMandate, transaction: Transaction) {
        mandate.addTransaction(transaction);
    }

    async saveDataRaw(id: string|number, fieldname: string, data: IDataObject<any>): Promise<void> {
        //const v = dataObject.getData(fieldname);
        if (data.changed && data.old !== data.current) {
            let val = data.saveFun ? data.saveFun() : data.current;
            if (nullOrUndefined(val)) {
                val = '';
            }
            await this.conn.fetchData(BASE_URL + MandateStore.mandateUrl + id + '/' + fieldname, {
                method: 'POST',
                body: {
                    id: id.toString(),
                    value: val,
                }
            })
        }
    }
    async saveTransactionDataRaw(id: string|number, fieldname: string, data: IDataObject<any>): Promise<void> {
        //const v = dataObject.getData(fieldname);
        if (data.changed && data.old !== data.current) {
            let val = data.saveFun ? data.saveFun() : data.current;
            if (nullOrUndefined(val)) {
                val = '';
            }
            await this.conn.fetchData(BASE_URL + MandateStore.transactionUrl + id + '/' + fieldname, {
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
    async saveTransactionData(dataObject: ISavable, fieldname: string): Promise<void> {
        await this.saveTransactionDataRaw(dataObject.id, fieldname, dataObject.getDataRaw(fieldname));
    }

}