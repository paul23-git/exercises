
import * as React from 'react'
import {RegisterForm} from "./RegisterForm";
import {observer} from "mobx-react-lite";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import Typography from "@mui/material/Typography";
import { StyledLinkButton } from '../../styles/shared-styles';

type PropTy = {
    onSubmit: (e: React.SyntheticEvent<HTMLElement>, d: FormData) => unknown,
    handleRequestPasswordRecover: (e: React.MouseEvent<HTMLButtonElement>) => unknown,
    actions: Array<React.ReactNode>,
}


export const Register = observer(function(props: PropTy) {
    const {handleRequestPasswordRecover, actions} = props;
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);
    const [err, setErr] = React.useState<string>('')

    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const q = e.target;
            if (q instanceof HTMLFormElement) {
                const data = new FormData(q);
                props.onSubmit(e, data);
            }
        } catch (err) {
            console.log("registration failed")
        }
    }
    return <form onSubmit={submit}>
        {err &&
            <><Typography variant={"caption"} color={"error"}
                          display={"inline"}>{dictionaryStore.get(language, 'register-err', "Registration failed, try again")}</Typography>
                <br/></>}
        <Typography variant={"caption"} color={"primary"} display={"inline"}>{dictionaryStore.get(language, 'register-forgot', "Forgot your login?")}</Typography>
        <StyledLinkButton type={'button'}
                tabIndex={-1}
                onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                    handleRequestPasswordRecover(e)
                }}>{dictionaryStore.get(language, 'btn-click-here', 'Click here')}
        </StyledLinkButton>
        <RegisterForm />

        <div style={{textAlign: 'right', flex: '0 0'}}>
            {actions}
        </div>
    </form>
});
