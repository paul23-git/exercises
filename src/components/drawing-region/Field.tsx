import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {Box} from "@mui/material";
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import {Player} from "./Player";
import Konva from "konva";
import {Exercise} from "../../models/Exercise";
import {PlayerHandler} from "./PlayerHandler";
import {ActionType, FieldCtx} from "../../stores/FieldContext";


type PropTy = {
    width: number,
    height: number,
    scaleFactor: number,
    proportion: number,
    exercise: Exercise,
    action: ActionType,
}

export const Field = observer(function (props: PropTy) {
    const {width, height, scaleFactor, proportion, exercise, action} = props;
    const maxWidth = 500;
    const maxHeight = 500 * proportion;
    const S = scaleFactor/500
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);


    return <Box width={"fit-content"} height={"fit-content"} sx={{backgroundColor: "green"}}>
        <FieldCtx.Provider value={{
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            canvasScale: S,
            action: action,
        }}>
            <Stage width={width}
                   height={height}
                   scale={{x: S, y: S}}
            >
                <Layer>
                    {Array.from(exercise.players.values(), p =>
                        <PlayerHandler
                            player={p}
                        />
                    )}


                </Layer>
            </Stage>
        </FieldCtx.Provider>
    </Box>
});