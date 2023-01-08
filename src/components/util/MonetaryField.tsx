import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {css, styled, Theme, Typography} from "@mui/material";


type PropTy = {
    amount: number,
}
export const StyledDiv = styled('div')(({theme}: {theme:Theme}) => css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`);

export const MonetaryField = observer(function ({amount}: PropTy) {
    const [language,] = React.useContext(LanguageCtx);
    return <StyledDiv><Typography>
        {Intl.NumberFormat(language, {style: 'currency', currency: 'EUR'}).format(amount)}
    </Typography></StyledDiv>
});