import {FetcherBase} from "../Fetchers/FetcherBase";
import {HTTPStatusError, KeyError} from "../errors";
import {ReadOnlyPlainArrayTy, ReadOnlyPlainJsonTy} from "../global";
import {IAuthStore} from "../interfaces/IAuthStore";
import {User} from "../models/User";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
const BASE_URL = process.env.REACT_APP_DYNAMIC_PATH || '';



export class AuthStore implements IAuthStore {
    get isSiteAdmin(): boolean {
        return this._isSiteAdmin;
    }

    set isSiteAdmin(value: boolean) {
        this._isSiteAdmin = value;
    }
    get isRoot(): boolean {
        return this._isRoot;
    }

    set isRoot(value: boolean) {
        //console.log("SHOULD NOT COMPLAIN")
        this._isRoot = value;
    }
    loginFailed: boolean = false;
    login_url = '/user/login';
    logout_url = '/user/logout';
    login_info_url = '/user/login-info';
    register_url: string = '/user/signup';
    resend_verification_url: string = '/user/resend-verification-link';
    verify_url: string = '/user/verify';
    request_password_recover_url: string = '/user/request-password-recover';
    password_recover_url: string = '/user/password-recover';
    request_user_accounts_url: string = '/user/request-account-recover';

    loginChecker: number|null = null;
    user: User|undefined = undefined;
    conn: FetcherBase;
    private _isRoot: boolean = false;
    private _isSiteAdmin: boolean = false;
    initialLoginCheck:boolean = true;
    registerErrorFields: Map<string, string> = new Map();
    get isRootOrSiteAdmin(): boolean {
        return this._isRoot || this._isSiteAdmin;
    }

    constructor (conn: FetcherBase) {
        //this.first_run = false;

        this.conn = conn;

        makeObservable<AuthStore, "_isRoot" | "_isSiteAdmin">(this, {
            user: observable,
            loginFailed: observable,
            login: computed,
            registerErrorFields: observable,
            isRoot: computed,
            isSiteAdmin: computed,
            _isRoot: observable,
            _isSiteAdmin: observable,
            isRootOrSiteAdmin: computed,
            initialLoginCheck: observable,
            checkLogin: action,
            doLogin: action,
            doLogout: action,
            setInitialLoginCheck: action,
        });
        this.checkLogin().then(() => {
            this.setInitialLoginCheck(false);
        }).finally(() => {
            this.loginChecker = window.setInterval(() => this.checkLogin, 5000);
        });
    }

    setInitialLoginCheck(value: boolean) {
        this.initialLoginCheck = value;
    }

    get login() {
        return !!this.user;
    }

    userUpdate = (user: User|undefined) => {
        if ((!this.user || !user || this.user.id !== user.id) && this.user !== user) {
            this.user = user;
        }

        //this.user.mergeData(user);
    };


    async checkLogin(): Promise<boolean> {
        try {
            if (!this.conn) {
                return !!this.user;
            }
            const response: {[p: string]: any}|any[] =
                await this.conn.fetchData(
                    BASE_URL + this.login_info_url,
                    {method: 'Get',}
                );
            if (response && typeof response === 'object' && !Array.isArray(response) && response.logged === true &&
                response.user && typeof response.user === 'object' && !Array.isArray(response.user)) {
                const tUser = User.buildUser(response.user);
                this.userUpdate(tUser);
                this.isRoot = !!response.isRoot;
                this.isSiteAdmin = !!response.isSiteAdmin;
                return true;
            } else {
                this.userUpdate(undefined);
                return false;
            }
        } catch (e) {
            if (e instanceof HTTPStatusError) {
                //console.error(`Download data failed for login, status: ${e.status}`);
                return !!this.user;
            } else {
                throw e;
            }
        }
    };

    async doLogout() {
        try {
            await this.conn.fetchData(BASE_URL + this.logout_url, {
                method: 'Post',
            });
            if (!(await this.checkLogin())) {
                window.location.reload();
            }
        } catch (e) {
            if (e instanceof HTTPStatusError) {
                console.error(`Logout failed ${e.request}, status: ${e.status}`);
            } else {
                throw e;
            }
        }
    }

    async loginHandler(response: ReadOnlyPlainArrayTy | ReadOnlyPlainJsonTy): Promise<boolean> {
        if (response && typeof response === 'object' && !Array.isArray(response) &&
            response.user && typeof response.user === 'object' && !Array.isArray(response.user)) {
            this.user = User.buildUser(response.user);
            this.loginFailed = false;
            return true;
        } else {
            throw new TypeError('Bad response data');
        }
    }

    async doLogin(data: ReadOnlyPlainJsonTy | FormData) {
        try{
            const response = await this.conn.fetchData(BASE_URL + this.login_url, {
                method: 'POST',
                body: data,
            });
            return this.loginHandler(response)
        } catch (e) {
            if (e instanceof HTTPStatusError && e.status === 401) {
                this.loginFailed = true;
                if (e instanceof HTTPStatusError) {
                    return false;
                }
            }
            this.loginFailed = true;
            return false;
        }
    }

    async registerUser(data: ReadOnlyPlainJsonTy | FormData): Promise<boolean> {
        function hasAgree(iter: Iterable<[string, FormDataEntryValue|ReadOnlyPlainJsonTy]>) {
            for (const [key, value] of iter) {
                if (key === "tos_agree" && (value === true || value === "agree")) {
                    return true
                }
            }
            return false;
        }
        if (!hasAgree(data instanceof FormData ? data.entries() : Object.entries(data))) {
            this.setRegisterErrorFields("tos_agree", "Please agree with accounts terms of service.");
            return false;
        }
        try{
            this.clearRegisterErrorFields();
            const response = await this.conn.fetchData(BASE_URL + this.register_url, {
                method: 'POST',
                body: data,
            });
            if (response && typeof response === 'object' && !Array.isArray(response) && !!response.logged_in &&
                response.user && typeof response.user === 'object' && !Array.isArray(response.user)) {
                this.userUpdate(User.buildUser(response.user));
                return true;
            } else {
                throw new TypeError('Bad response data');
            }
        } catch (e) {
            if (e instanceof HTTPStatusError) {
                const data = JSON.parse(e.response);
                if (data.name === "BAD_PARAMS" && data.message) {
                    const msg = data.details && data.details.user_message ? data.details.user_message : data.message;
                    this.setRegisterErrorFields(data.message, msg);
                    return false;
                }
            }
            throw e;
        }
    }

    setRegisterErrorFields(fieldname: string, value: string) {
        this.registerErrorFields.set(fieldname, value);
    }
    clearRegisterErrorFields() {
        this.registerErrorFields.clear();
    }

    async requestPasswordRecover(data: ReadOnlyPlainJsonTy | FormData): Promise<[boolean, Record<string, unknown>]> {
        try {
            await this.conn.fetchData(BASE_URL + this.request_password_recover_url, {
                method: 'POST',
                body: data,
            });
            return [true, {}];
        } catch (e) {
            return this.handleError(e as Error);
        }
    };

    async requestAccountRecover(data: ReadOnlyPlainJsonTy | FormData): Promise<[boolean, Record<string, unknown>]> {
        try {
            await this.conn.fetchData(BASE_URL + this.request_user_accounts_url, {
                method: 'POST',
                body: data,
            });
            return [true, {}];
        } catch (e) {
            return this.handleError(e as Error);
        }
    };

    handleError: (e: Error) => [boolean, Record<string, unknown>] = (e: Error): [boolean, Record<string, unknown>] => {
    if (e instanceof HTTPStatusError) {
        const data = e.response ? JSON.parse(e.response) : {};
        if (e.status === 403 || e.status === 401) {
            return [false, {error: 403, message: data.message || ''}];
        } else if (e.status === 400) {
            return [false, {error: 400, message: data.mesage || ''}]
        }
    }
    throw e;
};
}

