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
    exercise: Exercise,
}

export const Field = observer(function (props: PropTy) {
    const {width, height, exercise} = props;
    // const maxWidth = 500;
    // const maxHeight = 500 * proportion;
    //const S = scaleFactor/500
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const fieldContext = React.useContext(FieldCtx);
    const {maxWidth, maxHeight, canvasScale, action, detailView, setDetailView} = fieldContext;

    function onClick(e: Konva.KonvaEventObject<MouseEvent>) {
        if (action==='pointer' && (detailView[0] !== 'overview')) {
            setDetailView(['overview', null]);
        }
    }

    return <Box width={"fit-content"} height={"fit-content"} sx={{backgroundColor: "green"}}>
            <Stage width={width}
                   height={height}
                   scale={{x: canvasScale, y: canvasScale}}
                   onClick={onClick}
            >
                <Layer >
                    {Array.from(exercise.players.values(), p =>
                        <PlayerHandler
                            key={p.id}
                            player={p}
                        />
                    )}


                </Layer>
            </Stage>
    </Box>
});