import {FetcherUrl} from "../Fetchers/FetcherUrl";
import {MandateStore} from "./MandateStore";
import * as React from "react";

const _conn = new FetcherUrl();
const mandateStore = new MandateStore(_conn);

export const MandateStoreCtx: React.Context<MandateStore> = React.createContext<MandateStore>(mandateStore);