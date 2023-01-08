import {ICustomerData, IContactPersonData, ICustomer} from "../interfaces/ICustomer";
import {ISavable} from "../interfaces/ISavable";
import {SavableDataObjectModel} from "./DataObjectModel";
import {IIDable} from "../interfaces/IIDable";
import {DataObject} from "./DataObject";
import {ContactPerson} from "./ContactPerson";
import {computed, makeObservable, observable} from "mobx";
import {CustomerStore} from "../stores/CustomerStore";
import {ISavableStore} from "../interfaces/ISavableStore";
import {HTTPStatusError} from "../errors";


export class Customer extends SavableDataObjectModel implements ICustomer, ISavable, IIDable {
    private readonly _technical_contact: ContactPerson;
    id: string|number;
    get technical_contact(): ContactPerson {
        return this._technical_contact;
    }
    get status(): string {
        return this.getData('status');
    }
    set status(value: string) {
        this.setData('status', value);
    }

    get customer_number(): string {
        return this.getData('customer_number');
    }

    set customer_number(value: string) {
        this.setData('customer_number', value);
    }

    get zipcode(): string {
        return this.getData('zipcode');
    }

    set zipcode(value: string) {
        this.setData('zipcode', value);
    }

    get private(): boolean {
        return this.getData('private');
    }

    set private(value: boolean) {
        this.setData('private', value);
    }

    get first_name(): string {
        const o = this.dataInternal.get('first_name');
        if (!o) {
            return '';
        }
        return o.current;
    }

    set first_name(value: string) {
        this.setData('first_name', value);
    }

    get sur_name(): string {
        const o = this.dataInternal.get('sur_name');
        if (!o) {
            return '';
        }
        return o.current;
    }

    set sur_name(value: string) {
        this.setData('sur_name', value);
    }

    get language(): string {
        return this.getData('language');
    }

    set language(value: string) {
        this.setData('language', value);
    }

    get company_name(): string {
        return this.getData('company_name');
    }

    set company_name(value: string) {
        this.setData('company_name', value);
    }

    get coc_number(): string {
        return this.getData('coc_number');
    }

    set coc_number(value: string) {
        this.setData('coc_number', value);
    }

    get vat_number(): string {
        return this.getData('vat_number');
    }

    set vat_number(value: string) {
        this.setData('vat_number', value);
    }

    get install_country(): string {
        return this.getData('install_country');
    }

    set install_country(value: string) {
        this.setData('install_country', value);
    }

    get address(): string {
        return this.getData('address');
    }

    set address(value: string) {
        this.setData('address', value);
    }

    get house_number(): string {
        return this.getData('house_number');
    }

    set house_number(value: string) {
        this.setData('house_number', value);
    }
    get house_number_suffix(): string {
        return this.getData('house_number_suffix');
    }

    set house_number_suffix(value: string) {
        this.setData('house_number_suffix', value);
    }

    get municipality(): string {
        return this.getData('municipality');
    }

    set municipality(value: string) {
        this.setData('municipality', value);
    }

    get country(): string {
        return this.getData('country');
    }

    set country(value: string) {
        this.setData('country', value);
    }

    constructor(dat: ICustomerData) {
        super(dat);
        this.id = dat.id;
        this._technical_contact = new ContactPerson(dat.technical_contact);
        this.dataInternal = new Map(Object.entries(dat).filter(([key, _]) => key !== 'id' && key !== 'technical_contact').map(([k, v]) => {
            return [k, new DataObject(v)];
        }));
        makeObservable<Customer, '_technical_contact'>(this, {
            dataInternal: observable,
            _technical_contact: observable,
            first_name: computed,
            sur_name: computed,
            coc_number: computed,
            vat_number: computed,
            status: computed,
            private: computed,
            install_country: computed,
            address: computed,
            zipcode: computed,
            municipality: computed,
            country: computed,
            technical_contact: computed,
            customer_number: computed,
        });
    }


    //@ts-ignore
    mergeMe(newCustomer: ICustomer,
        overwrite_modified:boolean=true,
        forced:boolean=false) {
        // @ts-ignore
        super.mergeMe(newCustomer, overwrite_modified, forced);
        this._technical_contact.mergeMe(newCustomer.technical_contact, overwrite_modified, forced);

    }

    async requestSaveMe(customerStore: ISavableStore, field: string) {
        await customerStore.saveData(this, field);
        this.markSaved(field);

    }

    async requestSaveTechnicalContact(customerStore: CustomerStore, field: string) {
        await customerStore.saveDataRaw(this.id, 'technical-contact/' + field, this.technical_contact.getDataRaw(field));
        this.technical_contact.markSaved(field);
    }

    static buildCustomer(dat: Record<string, any>): Customer {
        const tc: IContactPersonData = dat.technical_contact ?? {
            name: '',
            mobile_number: '',
            email: '',
        }
        return new Customer({
            address: dat.address,
            country: dat.country,
            house_number: dat.house_number,
            house_number_suffix: dat.house_number_suffix,
            install_country: dat.install_country,
            municipality: dat.municipality,
            private: dat.private,
            status: dat.status,
            technical_contact: tc,
            zipcode: dat.zipcode,
            id: dat.id,
            first_name: dat.first_name,
            sur_name: dat.sur_name,
            coc_number: dat.coc_number,
            vat_number: dat.vat_numer,
            language: dat.language,
            company_name: dat.company_name,
            customer_number: dat.customer_number,
        });
    }

    async saveAllModified(customerStore: CustomerStore) {
        const p: Promise<void>[] = [];

        for (const [k,v] of this.dataInternal) {
            if (v.changed) {
                p.push(this.requestSaveMe(customerStore,k));
            }
        }
        for (const [k,v] of this.technical_contact.dataInternal) {
            if (v.changed) {
                p.push(this.requestSaveTechnicalContact(customerStore, k));
            }
        }
        await Promise.all(p);

    }
}