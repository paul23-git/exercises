import {ISavable} from "./ISavable";
import {IEditable} from "./IEditable";
import {CustomerStore} from "../stores/CustomerStore";

export interface IContactPersonData {
    first_name: string;
    sur_name: string;
    mobile_number: string;
    email: string;
}
export interface IContactPerson extends IContactPersonData, IEditable {
}


export interface ICustomerData {
    id: string|number;
    customer_number: string;
    first_name: string;
    sur_name: string;
    coc_number: string;
    vat_number: string;
    status: string;
    private: boolean;
    install_country: string;
    address: string;
    house_number: string;
    house_number_suffix: string;
    zipcode: string;
    municipality: string;
    country: string;
    company_name: string,
    language: string,
    technical_contact: IContactPersonData;
}

export interface ICustomer extends ICustomerData, ISavable {
    technical_contact: IContactPerson,
    requestSaveTechnicalContact(customerStore: CustomerStore, field: string): Promise<void>,
    saveAllModified(customerStore: CustomerStore): Promise<void>,
}