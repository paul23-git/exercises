import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import {ExerciseFieldOverviewView} from "./ExerciseFieldOverviewView";
import { PlayerDetailView } from "./PlayerDetailView";
import {IExercise} from "../../../interfaces/IExercise";


type PropTy = {
    type: string|number|null,
    resourceId: number|string|null,
    exercise: IExercise,
}

function DefaultView() {
    return <div></div>
}

export const DetailViewPicker = observer(function (props: PropTy) {
    const {type, resourceId, exercise} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    switch (type) {
        case "overview":
            return <ExerciseFieldOverviewView exercise={exercise}/>
        case "player":
            if (resourceId) {
                return <PlayerDetailView playerId={resourceId} exercise={exercise}/>
            }
            return <DefaultView/>
        default:
            return <DefaultView/>

    }
});