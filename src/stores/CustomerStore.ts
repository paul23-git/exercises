import {Customer} from "../models/Customer";
import {FetcherBase} from "../Fetchers/FetcherBase";
import {ISavableStore} from "../interfaces/ISavableStore";
import {ISavable} from "../interfaces/ISavable";
import {nullOrUndefined} from "../util/NullOrUndefined";
import {IDataObject} from "../interfaces/IDataObject";
import {action, makeObservable, observable} from "mobx";
import {HTTPStatusError} from "../errors";
import {TypeError} from "../errors/TypeError";
import {ICustomerPreview, ICustomerPreviewMerged} from "../interfaces/ICustomerPreview";
const BASE_URL = process.env.REACT_APP_DYNAMIC_PATH || '';

export class CustomerStore implements ISavableStore {
    static loadCustomerUrl: string = '/customer/';
    static saveCustomerUrl: string = '/customer/'
    conn: FetcherBase;

    customers: Map<string, Customer>;
    loadingList: Set<string>;
    constructor(conn: FetcherBase) {
        this.conn = conn;
        this.customers = new Map();
        this.loadingList = new Set();
        makeObservable(this,{
            customers: observable,
            loadingList: observable,
            loadCustomer: action,
        });
    }

    async loadCustomer(id: string) {
        this.loadingList.add(id);
        try {
            const dat = await this.conn.fetchData(
                BASE_URL + CustomerStore.loadCustomerUrl + id,
                {method: 'Get',}
            );
            if (Array.isArray(dat)) {
                throw new TypeError()
            }


            const customer = Customer.buildCustomer(dat);
            const old = this.customers.get(id);
            if (!old) {
                this.customers.set(id, customer);
            } else {
                old.mergeMe(customer);
            }
        } catch (err) {
            if (err instanceof HTTPStatusError) {
                console.log("res not found")
            }
            throw err;
        } finally {
            this.loadingList.delete(id);
        }
    }

    getCustomer(id: string) {
        return this.customers.get(id);
    }

    handleDataSaveError(err: Error, what: string): void {
        return ;
    }

    async saveData(dataObject: ISavable, fieldname: string): Promise<void> {
        //const v = dataObject.getData(fieldname);
        await this.saveDataRaw(dataObject.id, fieldname, dataObject.getDataRaw(fieldname));
    }

    async saveDataRaw(id: string|number, fieldname: string, data: IDataObject<any>): Promise<void> {
        //const v = dataObject.getData(fieldname);
        if (data.changed && data.old !== data.current) {
            let val = data.saveFun ? data.saveFun() : data.current;
            if (nullOrUndefined(val)) {
                val = '';
            }
            await this.conn.fetchData(BASE_URL + CustomerStore.saveCustomerUrl + id + '/' + fieldname, {
                method: 'POST',
                body: {
                    id: id.toString(),
                    value: val,
                }
            })
        }
    }
    async loadCustomerList(): Promise<ICustomerPreview[]> {
        const dat = await this.conn.fetchData(BASE_URL + CustomerStore.loadCustomerUrl, {method: 'GET'});
        if (Array.isArray(dat)) {
            const o = [];
            for (const el of dat) {
                if (el.id) {
                    o.push({id: el.id, first_name: el.first_name || '', sur_name: el.sur_name || ''});
                }
            }
            return o;
        } else {
            throw new TypeError();
        }
    }
    async createCustomer(): Promise<ICustomerPreviewMerged> {
        const dat = await this.conn.fetchData(BASE_URL + CustomerStore.loadCustomerUrl, {method: 'POST'});
        if (!Array.isArray(dat) && dat.id) {
            if (dat.first_name || dat.sur_name) {
                return {id: dat.id, name: [dat.first_name || '', dat.sur_name || ''].join(' ')};
            } else {
                return {id: dat.id, name: '<NONAMEGIVEN>'}
            }
        } else {
            throw new TypeError();
        }
    }
}