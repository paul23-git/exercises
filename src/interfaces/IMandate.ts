import {ITransaction, ITransactionData} from "./ITransaction";
import {ISavable} from "./ISavable";



export interface IMandateData {
    id: string|number;
    ct: number|null;
    url: string|null,
    twikey_id: string|null,
    customer: string|null,
    transactions: ITransactionData[],
    hasPDF: boolean,
    signed: boolean,
}

// @ts-ignore
export interface IMandate extends IMandateData, ISavable {
    transactions: ITransaction[],
    addTransaction(transaction: ITransaction): void,
    mergeMe(newMandate: IMandate,
            overwrite_modified:boolean,
            forced:boolean): void,
}