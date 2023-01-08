// @flow

import * as React from "react";
import {observer} from "mobx-react-lite";


import {FetcherUrl} from "../../Fetchers/FetcherUrl";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {DictionaryManagerCtx} from "../../stores/DictionaryManagerCtx";
import {IRouteData} from "../../interfaces/IRouteData";
import { MainPlannerBase } from "./MainPlannerBase";
import { DictionaryStoreCtx } from "../../stores/DictionaryStoreCtx";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import {ExerciseStoreCtx} from "../../stores/ExerciseStoreCtx";
import {ExerciseStore} from "../../stores/ExerciseStore";



type PropTy = {
    setDoLoginCB: (loginFunction: ((logged: boolean) => void)) => void,
    setLoginState: ((logged: boolean) => void),
    expandTopSideBarElemsCB: React.Dispatch<React.SetStateAction<(Array<IRouteData | React.ReactNode>)>>,
}

// const makeRootStore = (function makeRootStore() {
//     let r: null|RootStore = null;
//     function m(conn?: ?FetcherBase = undefined, routerStore: ?RouterStore) {
//         if (!r) {
//             r = new RootStore(conn, routerStore);
//         }
//         return r;
//     }
//     return m;
// })();




export const MainPlannerContextBase = observer(function (props: PropTy) {
    const {...restProps} = props;
    const connectorRef = React.useRef(new FetcherUrl());
    const [language,] = React.useContext(LanguageCtx);
    const dictionaryManager = React.useContext(DictionaryManagerCtx);

    const dictionaryStore = React.useMemo(() => dictionaryManager.addDictionaryGroup('planner'), [dictionaryManager]);
    const exerciseStore = React.useRef(new ExerciseStore(connectorRef.current));

    React.useEffect(() => {
        if (!dictionaryStore.hasLanguage(language)) {
            dictionaryStore.loadLanguage(language)
                .then(()=>{})
                .catch(e => console.log(e));
        }
    }, [dictionaryStore, language]);

    //load all main stores for main application

    return <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DictionaryStoreCtx.Provider value={dictionaryStore}>
            <ExerciseStoreCtx.Provider value ={exerciseStore.current}>
                {<MainPlannerBase {...restProps}/>}
            </ExerciseStoreCtx.Provider>
        </DictionaryStoreCtx.Provider>
        </LocalizationProvider>
    </>;
});
export default MainPlannerContextBase;