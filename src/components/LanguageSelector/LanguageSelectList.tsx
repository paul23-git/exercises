// @flow

import * as React from "react";
import {observer} from "mobx-react-lite";
import type {LanguageButtonPropTy} from "./LanguageSelect";
import {Button, styled, Theme, useMediaQuery} from "@mui/material";
import {DictionaryManagerCtx} from "../../stores/DictionaryManagerCtx";

// const styles = (theme: ThemeTy) => ({
//     list: {
//         marginBlockStart: 0,
//         marginBlockEnd: 0,
//     },
//     button: {
//         width: '100%',
//         justifyContent: 'start'
//     }
// });

type PropTy = {
    onChange: (e: React.SyntheticEvent<HTMLButtonElement>, value: string) => void,
}
const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    justifyContent: 'start',
}));
const StyledList = styled('ul')(({theme}) => ({
    marginBlockStart: 0,
    marginBlockEnd: 0,
}));


const LanguageButton = function(props: LanguageButtonPropTy) {
    const {value, name, onSelect} = props;
    return <li><StyledButton
        onClick={(ev) => {onSelect(ev, value);}}
        key={value}
    >
        {name}
    </StyledButton></li>
};

export const LanguageSelectList = observer(function LanguageSelectMenu(props: PropTy) {
    const {onChange} = props;
    const dictionaryManager = React.useContext(DictionaryManagerCtx);
    const smallScreen:boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const langList = dictionaryManager.getLanguageList();
    const tmap = new Map();
    if (langList) {
        for (const [k, v] of langList.entries()) {
            tmap.set(v, k);
        }
    }
    const languageStringsSorted: string[] = langList ? Array.from(langList.values()).sort() : [];
    const l = languageStringsSorted.length;
    const numRows =  l < 5 ? l : (l < 10 ? Math.ceil(l/2) : Math.ceil(l / 3));
    const firstCol = smallScreen ? languageStringsSorted : languageStringsSorted.slice(0, numRows);
    const secondCol = smallScreen ? [] : languageStringsSorted.slice(numRows, numRows*2);
    const thirdCol = smallScreen ? [] : languageStringsSorted.slice(numRows*2);

    return <div>{<>
        <StyledList>
            {firstCol.map(t =>
                <LanguageButton value={tmap.get(t) || t} name={t} onSelect={onChange} key={t}/>
            )}
        </StyledList>
        {!smallScreen &&<>
            <StyledList>
                {secondCol.map(t =>
                    <LanguageButton value={tmap.get(t) || t} name={t} onSelect={onChange} key={t}/>
                )}
            </StyledList>
            <StyledList>
                {thirdCol.map(t =>
                    <LanguageButton value={tmap.get(t) || t} name={t} onSelect={onChange} key={t}/>
                )}
            </StyledList>
        </>}
    </>}</div>;
});
