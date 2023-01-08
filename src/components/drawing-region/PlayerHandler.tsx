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
    const {canvasScale, maxHeight, maxWidth, action, setDetailView, detailView} = React.useContext(FieldCtx);


    function onDragEnd(e: Konva.KonvaEventObject<DragEvent>) {
        player.x = clamp(0, maxWidth, e.target.x());
        player.y = clamp(0, maxHeight, e.target.y());
    }
    function onClick(e: Konva.KonvaEventObject<MouseEvent>) {

        if (action==='pointer' && (detailView[0] !== 'player' || detailView[1] !== player.id)) {
            setDetailView(['player', player.id]);
        }
    }
    return <>
        <Player
            x={Number(player.x)}
            y={Number(player.y)}
            teamcolor={player.teamcolor}
            label={player.label}
            canvasScale={canvasScale}
            onDragEnd={onDragEnd}
            onClick={onClick}
            action={action}
        />
    </>
});