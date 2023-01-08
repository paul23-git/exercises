import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {FieldSizer} from "../drawing-region/FieldSizer";
import {ExerciseStore} from "../../stores/ExerciseStore";
import {ExerciseStoreCtx} from "../../stores/ExerciseStoreCtx";
import { Suspense } from "react";
import { DataLoader } from "../util/DataLoader";
import {CircularProgress} from "@mui/material";


type PropTy = {
    exercise: number|string,
}

export const ExerciseHelper = observer(function (props: PropTy) {
    const {exercise:exerciseId} = props;
    const exerciseStore = React.useContext(ExerciseStoreCtx);
    const exercise = exerciseStore.getExercise(exerciseId);

    return <>
        {exercise && <FieldSizer proportion={(91.4+2*6)/(55+2*2)} exercise={exercise}/>}
    </>
});


//(91.4+2*6)/(55+2*2)
export const ExerciseView = observer(function (props: PropTy) {
    const {exercise:exerciseId} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const exerciseStore = React.useContext(ExerciseStoreCtx);



    return <div>
        <DataLoader
            fallback={<CircularProgress />}
            onfail={<div>loading failed</div>}
            loadFunction={() => exerciseStore.loadExercise(exerciseId)}
        >
            <ExerciseHelper exercise={exerciseId}/>
        </DataLoader>
    </div>
});