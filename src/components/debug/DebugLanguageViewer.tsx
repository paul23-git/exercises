import * as React from "react";

import {observer} from "mobx-react-lite";
import {DictionaryManagerCtx} from "../../stores/DictionaryManagerCtx";
import {Button, IconButton, styled, Switch} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {TranslationEdit} from "./TranslationEdit";


const StyledDebugView = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width: 300,
    backgroundColor: '#FFFFFFB0',
    paddingLeft: theme.spacing(1),
    zIndex: 1e9,
}));
const StyledTopDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
}));
const StyledExpandBtn = styled(Button)(({ theme }) => ({
    width: '100%',
}));

export const DebugLanguageViewer = observer(function DebugLanguageViewer() {
    const dictionaryManager = React.useContext(DictionaryManagerCtx);
    const [open, setOpen] = React.useState(false);
    function onChangeDebug() {
        dictionaryManager.showDebugForced = !dictionaryManager.showDebugForced;
        dictionaryManager.showDebug = dictionaryManager.showDebugForced;
    }

    return <StyledDebugView>
        <StyledTopDiv>
            <Switch size={"small"} onChange={onChangeDebug} checked={dictionaryManager.showDebugForced}/>
            <IconButton size={"small"} onClick={e => dictionaryManager.showDebugDisplay = false}>
                <CloseIcon/>
            </IconButton>
        </StyledTopDiv>
        <div hidden={!open}><TranslationEdit/></div>
        <StyledExpandBtn size={"small"} onClick={e => setOpen(!open)}>{
            open ? <ExpandLess /> : <ExpandMore />}
        </StyledExpandBtn>
    </StyledDebugView>;
});
