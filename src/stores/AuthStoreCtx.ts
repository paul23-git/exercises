import {AuthStore} from "./AuthStore";
import * as React from "react";
import {FetcherUrl} from "../Fetchers/FetcherUrl";
import {IAuthStore} from "../interfaces/IAuthStore";

// export let AuthStoreCtx: React.Context<AuthStore>|undefined = undefined;
// export let authStore: AuthStore|undefined = undefined;
// export function load(conn: FetcherBase) {
//     if (!authStore) {
//         authStore = new AuthStore(conn);
//     }
//     if (!AuthStoreCtx) {
//         AuthStoreCtx = React.createContext(authStore);
//     }
// }

const authStore = new AuthStore(new FetcherUrl());

export const AuthStoreCtx: React.Context<IAuthStore> = React.createContext<IAuthStore>(authStore);