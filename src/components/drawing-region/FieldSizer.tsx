import * as React from "react";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {
    Box,
    Button,
    ButtonGroup,
    css,
    IconButton,
    styled,
    Theme, ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Field} from "./Field";
import {DimensionContext} from "../../stores/DimensionCtx";
import {Exercise} from "../../models/Exercise";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { AddCircle } from "@mui/icons-material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faArrowPointer } from '@fortawesome/free-solid-svg-icons'
import {ActionType} from "../../stores/FieldContext";

type PropTy = {
    proportion: number,
    exercise: Exercise,
}
const StyledDiv = styled('div')(({theme}: {theme: Theme}) => css`
  width:100%;
  height:100%;
  overflow: hidden;
`);
export const StyledGridDiv = styled('div')(({theme}: {theme:Theme}) => css`
  display: grid;
  margin-top: ${theme.spacing(0)};
  margin-bottom: ${theme.spacing(2)};
  grid-template-columns: 1fr 50%;
  ${theme.breakpoints.down('sm')} {
    grid-template-columns: 1fr;
  }
`);

export const StyledInlineIconButton = styled(IconButton)(({theme}: {theme:Theme}) => css`
  padding: 0;
  padding-left: 4px;
  padding-right: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  width: fit-content;
  border-radius: 0;
  height: 100%;
  margin-top: -6px;
  margin-bottom: -6px;
  margin-right: -8px;
  margin-left: 4px;
  height: 32px;
`);
export const FieldSizer = function (props: PropTy) {
    const {proportion, exercise} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const size = React.useContext(DimensionContext);
    const isSmallScreen:boolean = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
    const [addType, setAddType] = React.useState('Add');
    const [action, setAction] = React.useState<ActionType>("pointer")

    function calculateScale() {
        const maxScaleX = isSmallScreen ? (size.width) : (size.width/2);
        const maxScaleY = size.height / proportion - 8 - 24 - 3 - 50;
        return Math.min(maxScaleX, maxScaleY);
    }

    function changePointerMode(e: React.MouseEvent<HTMLElement>, newMode: ActionType|null) {
        if (newMode) {
            setAction(newMode);
        }
    }


    const scalar = Math.max(0.125, calculateScale());

    // @ts-ignore
    return <StyledDiv>
        <StyledGridDiv>
        <div>
            <Toolbar variant={"dense"}><Typography variant={'h6'}>{exercise.name || "<noname>"}</Typography></Toolbar>
        </div>
        <Box overflow={"visible"}>
            <Box marginTop={"16px"}>
                <Field
                    width={scalar}
                    height={scalar * proportion}
                    scaleFactor={scalar}
                    proportion={proportion}
                    exercise={exercise}
                    action={action}
                />
            </Box>
            <Box height={48} marginBottom={"4px"} marginTop={"2px"}>
                <ToggleButtonGroup
                    value={action}
                    size={"small"}
                    exclusive={true}
                    onChange={changePointerMode}
                >
                    <ToggleButton value={"pointer"}>
                        <FontAwesomeIcon icon={faArrowPointer} />
                    </ToggleButton>
                    <ToggleButton value={"add"}>
                        {<>
                            {"Add"}
                            <StyledInlineIconButton size={"small"} onClick={() => {console.log("clicked internal")}}>
                                <AddCircle/>
                            </StyledInlineIconButton>
                        </>}
                    </ToggleButton>

                    <ToggleButton value={"erase"}>
                        <FontAwesomeIcon icon={faEraser} />
                    </ToggleButton>

                </ToggleButtonGroup>
            </Box>
        </Box>
        </StyledGridDiv>
    </StyledDiv>
};