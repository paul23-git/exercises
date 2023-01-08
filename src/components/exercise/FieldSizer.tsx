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
import {Field} from "../drawing-region/Field";
import {DimensionContext} from "../../stores/DimensionCtx";
import {Exercise} from "../../models/Exercise";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { AddCircle } from "@mui/icons-material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faArrowPointer } from '@fortawesome/free-solid-svg-icons'
import {ActionType, FieldCtx} from "../../stores/FieldContext";
import { ToolButtons } from "./ToolButtons";

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
    const isSmallScreen:boolean = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
    const fieldContext = React.useContext(FieldCtx);


    // @ts-ignore
    return <Box overflow={"visible"}>
        <Box marginTop={"16px"}>
            <Field
                width={fieldContext.maxWidth * fieldContext.canvasScale}
                height={fieldContext.maxWidth * fieldContext.canvasScale * proportion}
                exercise={exercise}
            />
        </Box>
        <Box height={48} marginBottom={"4px"} marginTop={"2px"}>
            <ToolButtons />
        </Box>
    </Box>
};