// @flow

import * as React from "react";
import {FormControl, FormLabel, IconButton, Input, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import { StyledLinkButton } from "../../styles/shared-styles";


type PropTy = {
    handleRequestPasswordRecover: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
};


export const SigninForm = observer(function(props:PropTy) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);

    function handleClickShowPassword() {
        setShowPassword(old => !old);
    }

    const { handleRequestPasswordRecover} = props;



    return (<>
        <FormControl margin="normal" required fullWidth>
            <TextField
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                label={dictionaryStore.get(language, 'acc-username', 'Username')}
                autoCapitalize="none"
                variant={'standard'}
            />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <FormLabel htmlFor="password">{dictionaryStore.get(language, 'acc-password', "Password")}</FormLabel>
                <StyledLinkButton type={'button'}
                        tabIndex={-1}
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            handleRequestPasswordRecover(e)
                        }}>{dictionaryStore.get(language, 'register-forgot', 'Forgot your login?')}</StyledLinkButton>
            </div>
            <Input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                autoCapitalize="none"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
            {/*<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        />*/}
        </>
    );
});
