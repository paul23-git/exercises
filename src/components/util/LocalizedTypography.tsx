import * as React from "react";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {TypographyProps} from "@mui/material/Typography/Typography";
import {Typography} from "@mui/material";


type PropTy = TypographyProps & {
    dict_key: string,
    default_value?: string,
}

export const LocalizedTypography = observer(function (props: PropTy) {
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const {dict_key, default_value, ...rest} = props;
    const d = default_value === undefined ? dict_key : default_value;
    return <Typography {...rest}>
        {dictionaryStore.get(language, dict_key, d)}
    </Typography>
});