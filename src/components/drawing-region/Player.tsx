import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {Circle, Group, Text} from "react-konva";
import Konva from "konva";


type PropTy = {
    x: number;
    y: number;
    canvasScale: number;
    teamcolor: string;
    label: string;
    onDragEnd?: (evt: Konva.KonvaEventObject<DragEvent>) => void
}

export const Player = observer(function (props: PropTy) {
    const {canvasScale:S, x, y, teamcolor, label, onDragEnd} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const radiusBase = 8
    const r = S < 0.75 ? 0.75*radiusBase/S : radiusBase;
    const textScale = S < 2/3 ? 2/3*1/S : 1;
    return <Group
        draggable={!!onDragEnd}
        onDragEnd={onDragEnd}
        x={x}
        y={y}
    >
        <Circle
            x={0}
            y={0}
            fill={teamcolor}
            stroke={"black"}
            radius={r}
        />
        <Text x={-r} y={r+1} text={label} scale={{x: textScale, y: textScale}} align={'center'} fontSize={18}/>

    </Group>
});