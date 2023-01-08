import * as React from "react";
import {IDictionaryStore} from "../interfaces/IDictionaryStore";
import {DictionaryStore} from "./DictionaryStore";
import {FetcherUrl} from "../Fetchers/FetcherUrl";
//import {FetcherUrl} from "../Fetchers/FetcherUrl";

const _conn = new FetcherUrl();
const dictionaryStore = new DictionaryStore(_conn, 'planner');
// @ts-ignore
export const DictionaryStoreCtx = React.createContext<IDictionaryStore>(dictionaryStore);
