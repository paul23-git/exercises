import {AuthStore} from "./AuthStore";
import * as React from "react";
import {FetcherUrl} from "../Fetchers/FetcherUrl";
import {IAuthStore} from "../interfaces/IAuthStore";
import {CustomerStore} from "./CustomerStore";

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

const customerStore = new CustomerStore(new FetcherUrl());

export const CustomerStoreCtx: React.Context<CustomerStore> = React.createContext<CustomerStore>(customerStore);