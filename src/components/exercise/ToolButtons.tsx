import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {Menu, MenuItem, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowPointer, faEraser} from "@fortawesome/free-solid-svg-icons";
import {AddCircle} from "@mui/icons-material";
import {StyledInlineIconButton} from "./FieldSizer";
import {ActionType, FieldCtx} from "../../stores/FieldContext";


type PropTy = {
}

export const ToolButtons = observer(function (props: PropTy) {
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const fieldContext = React.useContext(FieldCtx);
    const [open, setOpen] = React.useState(false);
    const btnRef = React.useRef(null);

    function handleChangeAdditionModeClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        onChangeAdditionMode(e);
    }
    function onChangeAdditionMode(e: React.MouseEvent<HTMLButtonElement>) {
        setOpen(true);
    }
    function handleAdditionPicker(e: React.MouseEvent<HTMLElement>, key: string) {
        fieldContext.setAdditionKey(key);
        handleAdditionPickerClose();
    }
    function handleAdditionPickerClose() {
        setOpen(false);
    }
    function changePointerMode(e: React.MouseEvent<HTMLElement>, newMode: ActionType|null) {
        if (newMode) {
            fieldContext.setAction(newMode);
        }
    }

    return <>
        <ToggleButtonGroup
            value={fieldContext.action}
            size={"small"}
            exclusive={true}
            onChange={changePointerMode}
        >
            <ToggleButton value={"pointer"}>
                <FontAwesomeIcon icon={faArrowPointer} />
            </ToggleButton>
            <ToggleButton value={"add"}>
                {<>
                    {fieldContext.additionKey ? fieldContext.additionKey : "add"}
                    <StyledInlineIconButton
                        size={"small"}
                        onClick={handleChangeAdditionModeClick}
                        ref={btnRef}
                    >
                        <AddCircle/>
                    </StyledInlineIconButton>
                    <Menu
                        anchorEl={btnRef.current}
                        open={open}
                        onClose={handleAdditionPickerClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={(e) => handleAdditionPicker(e, "player")}>Player</MenuItem>
                        <MenuItem onClick={(e) => handleAdditionPicker(e, "cone")}>Cone</MenuItem>
                        <MenuItem onClick={(e) => handleAdditionPicker(e, "goal")}>Goal</MenuItem>
                        <MenuItem onClick={(e) => handleAdditionPicker(e, "pass")}>Pass line</MenuItem>
                        <MenuItem onClick={(e) => handleAdditionPicker(e, "dribble")}>Dribble line</MenuItem>
                    </Menu>
                </>}
            </ToggleButton>

            <ToggleButton value={"erase"}>
                <FontAwesomeIcon icon={faEraser} />
            </ToggleButton>

        </ToggleButtonGroup>
    </>
});