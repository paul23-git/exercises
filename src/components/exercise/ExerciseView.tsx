import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {FieldSizer} from "./FieldSizer";
import {ExerciseStore} from "../../stores/ExerciseStore";
import {ExerciseStoreCtx} from "../../stores/ExerciseStoreCtx";
import { Suspense } from "react";
import { DataLoader } from "../util/DataLoader";
import {CircularProgress, css, styled, Theme, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {DimensionContext} from "../../stores/DimensionCtx";
import {ActionType, FieldCtx} from "../../stores/FieldContext";
import {DetailViewPicker} from "./detail-view/DetailViewPicker";
import {Exercise} from "../../models/Exercise";
import {IExercise} from "../../interfaces/IExercise";


type PropTy = {
    exercise: number|string,
}



export const StyledGridDiv = styled('div')(({theme}: {theme:Theme}) => css`
  display: grid;
  margin-top: ${theme.spacing(0)};
  margin-bottom: ${theme.spacing(2)};
  grid-template-columns: 5fr 3fr;
  ${theme.breakpoints.down('sm')} {
    grid-template-columns: 1fr;
  }
`);
const StyledDiv = styled('div')(({theme}: {theme: Theme}) => css`
  width:100%;
  height:100%;
  overflow: hidden;
`);

function calculateScale(fieldWidth: number, fieldHeight: number, screenWidth: number, screenHeight: number, splitScreen: boolean) {
    const verticalUsage = 16+44;
    const horizontalUsage = 8;
    const maxScaleX = ((splitScreen ? (screenWidth) : (screenWidth/3))-horizontalUsage)/Math.max(1, fieldWidth);
    const maxScaleY = (screenHeight-verticalUsage) / (Math.max(1,fieldHeight));
    return Math.min(maxScaleX, maxScaleY);
}

export const ExerciseHelper = observer(function (props: PropTy) {
    const {exercise:exerciseId} = props;
    const exerciseStore = React.useContext(ExerciseStoreCtx);
    const exercise = exerciseStore.getExercise(exerciseId);
    const size = React.useContext(DimensionContext);
    const isSmallScreen:boolean = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
    const [addType, setAddType] = React.useState<string|null>(null);
    const [action, setAction] = React.useState<ActionType>("pointer")
    const [detailView, setDetailView] = React.useState<[string|number|null, string|number|null]>(['overview', null]);

    const proportion = exercise ? exercise.field.height/exercise.field.width : 1;//(91.4+2*6)/(55+2*2);
    const maxWidth = 500;
    const maxHeight = 500 * proportion;

    const scalar = calculateScale(maxWidth, maxHeight, size.width, size.height, isSmallScreen);
    const verticalUsage = 16+44;
    const horizontalUsage = 8;
    const maxScaleX = ((isSmallScreen ? (size.width) : (size.width/2))-horizontalUsage)/maxWidth;
    const maxScaleY = (size.height-verticalUsage) / (maxHeight);
    const S = scalar

    return <>
        {exercise && <>
            <FieldCtx.Provider value={{
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                canvasScale: S,
                additionKey: addType,
                setAdditionKey: setAddType,
                action: action,
                setAction: setAction,
                detailView: detailView,
                setDetailView: setDetailView,
            }}>
                <StyledDiv>
                    <StyledGridDiv>
                        <div>
                            <Toolbar variant={"dense"}><Typography variant={'h6'}>{exercise.name || "<noname>"}</Typography></Toolbar>
                            {detailView[0] && exercise && <DetailViewPicker type={detailView[0]} resourceId={detailView[1]} exercise={exercise}/>}
                            <br/>
                            {"detail: " + (detailView).toString()}<br/>
                            {"scale: " + (S).toString(10)}<br/>
                            {"scale_x: " + (maxScaleX).toString(10)}<br/>
                            {"scale_y: " + (maxScaleY).toString(10)}<br/>
                        </div>
                        <FieldSizer proportion={proportion} exercise={exercise}/>
                    </StyledGridDiv>
                </StyledDiv>
            </FieldCtx.Provider>
        </>}
    </>
});


//(91.4+2*6)/(55+2*2)
export const ExerciseView = observer(function (props: PropTy) {
    const {exercise:exerciseId} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const exerciseStore = React.useContext(ExerciseStoreCtx);



    return <>
        <DataLoader
            fallback={<CircularProgress />}
            onfail={<div>loading failed</div>}
            loadFunction={() => exerciseStore.loadExercise(exerciseId)}
        >
            <ExerciseHelper exercise={exerciseId}/>
        </DataLoader>
    </>
});