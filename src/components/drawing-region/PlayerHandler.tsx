import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {IPlayer} from "../../interfaces/IPlayer";
import { Player } from "./Player";
import Konva from "konva";
import {clamp} from "../../util/clamp";
import {FieldCtx} from "../../stores/FieldContext";


type PropTy = {
    player: IPlayer,
}



export const PlayerHandler = observer(function (props: PropTy) {
    const {player} = props;
    const {canvasScale, maxHeight, maxWidth} = React.useContext(FieldCtx);

    function onDragEnd(e: Konva.KonvaEventObject<DragEvent>) {
        player.x = clamp(0, maxWidth, e.target.x());
        player.y = clamp(0, maxHeight, e.target.y());
    }
    return <>
        <Player
            x={player.x}
            y={player.y}
            teamcolor={player.teamcolor}
            label={player.label}
            canvasScale={canvasScale}
            onDragEnd={onDragEnd}
        />
    </>
});