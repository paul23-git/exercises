import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import { ExerciseView } from "../exercise/ExerciseView";


type PropTy = {}

export const Home = observer(function (props: PropTy) {
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    return <>
        <ExerciseView exercise={1}/>
    </>
});