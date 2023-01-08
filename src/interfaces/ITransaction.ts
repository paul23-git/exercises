import {ISavable} from "./ISavable";

export interface ITransaction extends ITransactionData, ISavable {

}

export interface ITransactionData {
    id: string|number;
    mandate: number;
    amount: string|number;
    date: Date;
    reqcolldt: Date|null;
    place: string|null;
    message: string|null;
    ref: string|null;
    state: string;
    refase2e: boolean;
    twikey_id: number;
    contract_id: number;
}