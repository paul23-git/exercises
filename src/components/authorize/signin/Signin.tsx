import * as React from 'react';
import {observer} from "mobx-react-lite";
import {SigninForm} from "./SigninForm";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {SyntheticEvent, useContext} from "react";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import {AuthStoreCtx} from "../../../stores/AuthStoreCtx";
import {Typography} from "@mui/material";
import { StyledLinkButton } from '../../styles/shared-styles';



type PropTy = {
    onSubmit: (e: React.SyntheticEvent<HTMLElement>, d: FormData) => unknown,
    handleRequestPasswordRecover: (e: React.MouseEvent<HTMLButtonElement>) => unknown,
    actions: Array<React.ReactNode>,
}


export const Signin = observer(function(props: PropTy) {
    const authStore = useContext(AuthStoreCtx);
    const {handleRequestPasswordRecover, actions, onSubmit} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);

    function submit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const q = e.target;
        if (q instanceof HTMLFormElement) {
            const data = new FormData(q);
            onSubmit(e, data);
        }
    }

    return (<>
        <div hidden={!authStore.loginFailed}>
            <Typography component="h6"
                        color="error"
            >
                {"Incorrect username or password"}
            </Typography>
        </div>

        <form onSubmit={submit}>
            <Typography variant={"caption"} color={"primary"} display={"inline"}>{dictionaryStore.get(language, 'register-forgot', "Forgot your login?")}</Typography>
            <StyledLinkButton
                type={'button'}
                tabIndex={-1}
                onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                    handleRequestPasswordRecover(e)
                }}>{dictionaryStore.get(language, 'btn-click-here', 'Click here')}</StyledLinkButton>
            <SigninForm
                handleRequestPasswordRecover={handleRequestPasswordRecover}
            />
            <div style={{textAlign: 'right'}}>
                {actions}
            </div>
        </form>
    </>);
});
