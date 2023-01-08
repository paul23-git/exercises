// @flow

import * as React from "react";
import {css, Paper, styled, Theme} from "@mui/material";
import {LanguageSelectList} from "./LanguageSelectList";
import {formDialogContent} from "../styles/shared-styles";


type PropTy = {
    onChange: (e: React.SyntheticEvent<HTMLButtonElement>, value: string) => void,
}
const StyledFormDialogPaper = styled(Paper)(({theme}: {theme: Theme}) => css`
${typeof formDialogContent === 'string' ? formDialogContent : formDialogContent({theme})} 
`);
export const LanguageSelectPaper = function LanguageSelectPaper(props: PropTy) {
    const {onChange} = props;

    return <StyledFormDialogPaper >
        <LanguageSelectList onChange={onChange} />
    </StyledFormDialogPaper>;
};
