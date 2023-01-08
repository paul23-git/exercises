import * as React from 'react';


import {observer} from 'mobx-react-lite';
import { DictionaryManagerCtx } from '../../stores/DictionaryManagerCtx';
import {LanguageRouter} from "./LanguageRouter";
import {CssBaseline} from "@mui/material";


export const Main = observer(function Main() {
    const dictionaryManager = React.useContext(DictionaryManagerCtx);
    let dictionaryInitialLoaded = React.useRef(false);
    let dictionaryIsLoading = React.useRef(false);

    React.useEffect(() => {
        if (dictionaryManager && !dictionaryInitialLoaded.current && !dictionaryIsLoading.current) {
            dictionaryIsLoading.current = true;
            dictionaryManager.loadLangList()
                .catch(e => console.log(e))
                .finally(() => {
                dictionaryInitialLoaded.current = true;
                dictionaryIsLoading.current = false;
            });
        }
    }, [dictionaryInitialLoaded, dictionaryManager, dictionaryIsLoading]);


    return <>
        <CssBaseline/>

        {dictionaryManager && <LanguageRouter defaultLanguage={
            // @ts-ignore
            (navigator.language || navigator.userLanguage || '').toLowerCase()
        }/>}
    </>;
});
