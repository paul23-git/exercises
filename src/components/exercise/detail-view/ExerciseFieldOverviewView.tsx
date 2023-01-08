import * as React from "react";
import {observer, useLocalObservable} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import {Box, css, styled, Theme, Typography, useTheme} from "@mui/material";
import {StyledInsidePaperDiv} from "../../styles/shared-styles";
import {LocalEditComponent} from "../../edit-components/LocalEditComponent";
import { IExercise } from "../../../interfaces/IExercise";
import {useHandleErrors} from "../../hooks/ViewHook";
import {buildErrorText} from "../../../errors/ErrorHelper";
import {ExerciseStoreCtx} from "../../../stores/ExerciseStoreCtx";
import { StyledGridDiv } from "./styles";


type PropTy = {
    exercise: IExercise,
}


export const ExerciseFieldOverviewView = observer(function (props: PropTy) {
    const {exercise} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const theme = useTheme();
    const errors = useLocalObservable<Map<string, string>>(() => new Map());
    const exerciseStore = React.useContext(ExerciseStoreCtx);
    const exerciseField = exercise.field;
    const [errorWrapFunction, errMsg, popupState] = useHandleErrors<string>(
        (err: Error, fieldname?: string) => {
            const msg = buildErrorText(err, fieldname || '', dictionaryStore, language);
            if (fieldname) {
                errors.set(fieldname, msg);
                if (process.env.REACT_APP_SERVERLESS !== "true") {
                    exerciseField.undoModified(fieldname);
                }
            }
            return msg;
        }
    );

    function onChange(field: string, event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, value: string) {
        event.preventDefault();
        onChangeBase(field, value);
    }
    function onChangeBase(field: string, value: any) {
        exerciseField.setData(field, value);
    }

    async function onBlur(field: string, event: React.SyntheticEvent<HTMLElement>) {
        const target = event.currentTarget;
        try {
            await exerciseField.requestSaveMe(exerciseStore, field);
            errors.delete(field)
        } catch (e) {
            if (e instanceof Error) {
                errorWrapFunction(e, target, field);
            } else {
                throw e;
            }
        }
    }


    return <StyledInsidePaperDiv theme={theme} noheader={false}>
        <Typography variant={"subtitle2"}>{"Field settings"}</Typography>
        <StyledGridDiv>
            <LocalEditComponent
                name={'width'}
                label={dictionaryStore.get(language, 'ex-field-width', 'Width')}
                inputProps={{
                    name: 'width',
                }}
                value={exerciseField.width.toString(10)}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.get('field_width')}
                type={'number'}
            />
            <LocalEditComponent
                name={'height'}
                label={dictionaryStore.get(language, 'ex-field-height', 'Height')}
                inputProps={{
                    name: 'height',
                }}
                value={exerciseField.height.toString(10)}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.get('field_height')}
                type={'number'}
            />
        </StyledGridDiv>

    </StyledInsidePaperDiv>
});