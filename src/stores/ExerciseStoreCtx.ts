import {FetcherUrl} from "../Fetchers/FetcherUrl";
import * as React from "react";
import {ExerciseStore} from "./ExerciseStore";

const _conn = new FetcherUrl();
const exerciseStore = new ExerciseStore(_conn);

export const ExerciseStoreCtx: React.Context<ExerciseStore> = React.createContext<ExerciseStore>(exerciseStore);