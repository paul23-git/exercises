
import * as React from "react";
import {observer} from "mobx-react-lite";
import {FetcherUrl} from "../../Fetchers/FetcherUrl";
import {LanguageSelect} from "../LanguageSelector/LanguageSelect";
import {useHandleErrors} from "../hooks/ViewHook";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {Button, TextField, Typography} from "@mui/material";
import {bindPopover} from "material-ui-popup-state";
import { ErrorPopper } from "../util/ErrorPopper";
const BASE_URL = process.env.REACT_APP_DYNAMIC_PATH || '';


export const TranslationEdit = observer(function TranslationEdit() {
    const [language,] = React.useContext(LanguageCtx);
    const [langKey, setLangKey] = React.useState(language);
    const [group, setGroup] = React.useState('entry');
    const [key, setKey] = React.useState('');
    const [translation, setTranslation] = React.useState('');
    const submitRef = React.useRef();
    const [errorWrapFunction, errMsg, popupState] = useHandleErrors(
        (err: Error, key: string|undefined) => {
            return "Translation insertion failed";
        });
    async function submitTranslation(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (key && langKey) {
            const fetcher = new FetcherUrl();
            try {
                await fetcher.fetchData(BASE_URL + "/dictionary/set-translation", {
                    method: "POST",
                    body: {
                        language: langKey,
                        group: group,
                        key: key,
                        translation: translation,
                    },
                });
                setKey('');
                setTranslation('');
            } catch (err) {
                if (err instanceof Error) {
                    errorWrapFunction(err, submitRef.current);
                }
            }
        }
    }

    return <>
        <form onSubmit={submitTranslation}>
            <div>
                <Typography display={'inline'} style={{marginRight: '0.25em'}}>{"Language"}</Typography>
                <LanguageSelect
                    value={langKey}
                    onChange={(e, value) => setLangKey(value)}
                />
            </div>
            <div>
                <Typography display={'inline'} style={{marginRight: '0.25em'}}>{"Group"}</Typography>
                <TextField value={group} onChange={e => setGroup(e.currentTarget.value)}/>
            </div>
            <div>
                <Typography display={'inline'} style={{marginRight: '0.25em'}}>{"Key"}</Typography>
                <TextField value={key} onChange={e => setKey(e.currentTarget.value)}/>
            </div>
            <div>
                <Typography display={'inline'} style={{marginRight: '0.25em'}}>{"Translation"}</Typography>
                <TextField value={translation} onChange={e => setTranslation(e.currentTarget.value)} multiline/>
            </div>
            <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                key={'submit'}
                sx={{marginTop: 4}}
            >{"Submit"}</Button>

        </form>
        <ErrorPopper
            // @ts-ignore
            popperProps={bindPopover(popupState)}
            errMsg={errMsg}
        />
    </>;
});
