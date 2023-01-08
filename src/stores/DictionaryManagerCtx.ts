import * as React from "react";
import {IDictionaryManager} from "../interfaces/IDictionaryManager";
import {FetcherUrl} from "../Fetchers/FetcherUrl";
import {DictionaryManager} from "./DictionaryManager";

const _conn = new FetcherUrl();
const dictionaryManager = new DictionaryManager(_conn);
// @ts-ignore
export const DictionaryManagerCtx: React.Context<IDictionaryManager> = React.createContext<IDictionaryManager>(dictionaryManager);
