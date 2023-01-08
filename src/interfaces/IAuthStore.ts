import {ReadOnlyPlainJsonTy} from "../global";
import {IUser} from "./IUser";

export interface IAuthStore {
    isRootOrSiteAdmin: boolean;
    loginFailed: boolean;
    login: boolean;
    initialLoginCheck: boolean;
    user: IUser|undefined;
    checkLogin(): Promise<boolean>;
    doLogout(): Promise<void>;
    doLogin(data: ReadOnlyPlainJsonTy | FormData): Promise<boolean>;
    registerUser(data: FormData): Promise<boolean>;
    requestPasswordRecover(data: ReadOnlyPlainJsonTy | FormData): Promise<[boolean, Record<string, unknown>]>;
    requestAccountRecover(data: ReadOnlyPlainJsonTy | FormData): Promise<[boolean, Record<string, unknown>]>

}