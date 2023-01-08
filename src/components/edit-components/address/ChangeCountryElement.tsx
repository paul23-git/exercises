// @flow
import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import {FetcherUrl} from "../../../Fetchers/FetcherUrl";
import {DictionaryStore} from "../../../stores/DictionaryStore";
import {Autocomplete, TextField, Typography} from "@mui/material";
import { StyledFormLabelDiv } from "../LocalEditComponent";


type PropTy = {
    value: string,
    onChange: ((key: string, e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, value: string) => void),
    onBlur?: ((key: string, e: React.FocusEvent<HTMLDivElement>) => Promise<void>),
    label: string,
}

export const ChangeCountryElement = observer(function(props: PropTy) {
    const {value, onChange, onBlur, label} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);

    const countryDictionaryStore = React.useRef(new DictionaryStore(new FetcherUrl(), 'country-codes'));
    const [mainList, setMainList] = React.useState<Map<string, string>>(new Map());
    const [mainInvList, setMainInvList] = React.useState<Map<string, string>>(new Map());

    React.useEffect(() => {
        countryDictionaryStore.current.loadLanguage(language).then((l: string|undefined) => {
            if (l) {
                const n = countryDictionaryStore.current.getFullLanguage(l);
                if (n) {
                    setMainList(n);
                    const t = new Map();
                    for (const [code, name] of n.entries()) {
                        t.set(name, code);
                    }
                    setMainInvList(t);
                }
            }
        });
    }, [language]);

    const sorted: string[] = React.useMemo(() => {
        return Array.from(mainInvList.keys()).sort((l: string, r: string) => l.localeCompare(r));
    }, [mainInvList]);


    return <>
        <StyledFormLabelDiv>
            <Typography>{label}</Typography>
        </StyledFormLabelDiv>
        <div>
            <Autocomplete
                value={mainList.get(value || '') || ''}
                options={sorted}
                blurOnSelect={true}
                clearOnBlur={true}
                autoHighlight={true}
                autoComplete={true}
                renderInput={(params) => {
                    return <><TextField
                        {...params}
                        variant={'standard'}
                        label={label}
                    />
                    </>
                }}
                onChange={(e: any, v, r) => {
                    const tv = v || '';
                    if (r === 'selectOption') {
                        onChange('country', e, mainInvList.get(tv) || tv);
                    }
                }}
                onBlur={(e) => {
                    onBlur && onBlur('country', e).then(() => {});
                }}
            />
        </div>
    </>;
});
