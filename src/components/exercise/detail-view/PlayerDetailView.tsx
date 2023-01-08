    import * as React from "react";
import {observer, useLocalObservable} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import {Typography, useTheme} from "@mui/material";
    import {IExercise} from "../../../interfaces/IExercise";
    import {StyledGridDiv} from "./styles";
    import {LocalEditComponent} from "../../edit-components/LocalEditComponent";
    import {StyledInsidePaperDiv} from "../../styles/shared-styles";
    import {ExerciseStoreCtx} from "../../../stores/ExerciseStoreCtx";
    import {useHandleErrors} from "../../hooks/ViewHook";
    import {buildErrorText} from "../../../errors/ErrorHelper";


type PropTy = {
    playerId: number|string,
    exercise: IExercise,
}

export const PlayerDetailView = observer(function (props: PropTy) {
    const {playerId, exercise} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const theme = useTheme();
    const errors = useLocalObservable<Map<string, string>>(() => new Map());
    const exerciseStore = React.useContext(ExerciseStoreCtx);
    const exerciseField = exercise.field;
    const player = exercise.getPlayer(playerId);

    const [errorWrapFunction, errMsg, popupState] = useHandleErrors<string>(
        (err: Error, fieldname?: string) => {
            const msg = buildErrorText(err, fieldname || '', dictionaryStore, language);
            if (fieldname) {
                errors.set(fieldname, msg);
                if (player) {
                    if (process.env.REACT_APP_SERVERLESS !== "true") {
                        exerciseField.undoModified(fieldname);
                    }
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
        player && player.setData(field, value);
    }

    async function onBlur(field: string, event: React.SyntheticEvent<HTMLElement>) {
        const target = event.currentTarget;
        try {
            if (player) {
                await player.requestSaveMe(exerciseStore, field);
            }
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
        <Typography variant={"subtitle2"}>{"Player settings"}</Typography>
        {player && <StyledGridDiv>
            <LocalEditComponent
                name={'x'}
                label={dictionaryStore.get(language, 'ex-player-x', 'X')}
                inputProps={{
                    name: 'x',
                }}
                value={player.x.toString(10)}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.get('player_x')}
                type={'number'}
            />
            <LocalEditComponent
                name={'y'}
                label={dictionaryStore.get(language, 'ex-player-y', 'Y')}
                inputProps={{
                    name: 'y',
                }}
                value={player.y.toString(10)}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.get('player_y')}
                type={'number'}
            />
            <LocalEditComponent
                name={'label'}
                label={dictionaryStore.get(language, 'ex-player-label', 'label')}
                inputProps={{
                    name: 'label',
                }}
                value={player.label}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.get('player_label')}
            />

            <LocalEditComponent
                name={'teamcolor'}
                label={dictionaryStore.get(language, 'ex-player-teamcolor', 'teamcolor')}
                inputProps={{
                    name: 'label',
                }}
                value={player.teamcolor}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.get('player_teamcolor')}
            />
        </StyledGridDiv>}

    </StyledInsidePaperDiv>
});