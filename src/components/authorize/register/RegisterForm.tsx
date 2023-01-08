import * as React from 'react';
import {AuthStoreCtx} from "../../../stores/AuthStoreCtx";
import {observer} from "mobx-react-lite";
import {Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel} from "@mui/material";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import { SimpleFormControl } from '../../forms/SimpleFormControl';
import {PasswordInput} from "../../forms/PasswordInput";

export const RegisterForm  = observer(function RegisterForm() {
    const authStore = React.useContext(AuthStoreCtx)
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const [errorFields, setErrorFields] = React.useState<Map<string, string>>(() => new Map());

    // eslint-disable-next-line
    for (const [f, v] of errorFields) {
        //console.log(`${f}: ${v}`) //hack for mobx - otherwise it won't update
    }

    return <div style={{overflowY: 'auto', flex: '1 1'}}>
        <SimpleFormControl
            name="firstname"
            type="text"
            label={dictionaryStore.get(language, 'acc-firstname', "Given name")}
            errorFields={errorFields}
            required
            labelComponent={InputLabel}
        />
        <SimpleFormControl
            name="surname"
            type="text"
            label={dictionaryStore.get(language, 'acc-surname', "Surname")}
            errorFields={errorFields}
            required
            labelComponent={InputLabel}
        />
        <SimpleFormControl
            name="username"
            label={dictionaryStore.get(language, 'acc-username', "Username")}
            errorFields={errorFields}
            required
            labelComponent={InputLabel}
            inputProps={{autoCapitalize: "none"}}
        />
        <SimpleFormControl
            name="password"
            label={dictionaryStore.get(language, 'acc-password', "Password")}
            errorFields={errorFields}
            required
            labelComponent={InputLabel}
            inputElement={<PasswordInput
                name={"password"}
                id={"password"}
                autoComplete={'password'}
            />}
        />
        <SimpleFormControl
            name="email"
            label={dictionaryStore.get(language, 'acc-email', "Email")}
            type="email"
            errorFields={errorFields}
            required
            labelComponent={InputLabel}
            inputProps={{autoCapitalize: "none"}}
        />
        <FormControl margin={"dense"}
                     required={true}
                     error={!!errorFields.get("tos_agree")}
        >
            <FormControlLabel
                control={
                    <Checkbox value={"agree"} name={"tos_agree"}/>
                }
                label={dictionaryStore.get(language, 'acc-tos-agreement', "I understand that accounts are personal, non transferable.")}
            />
            <FormHelperText>{errorFields.get("tos_agree")}</FormHelperText>
        </FormControl>
    </div>

});
