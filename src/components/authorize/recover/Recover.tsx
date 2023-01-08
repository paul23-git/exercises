import * as React from 'react';
import {observer} from "mobx-react-lite";
import {SimpleFormControl} from "../../forms/SimpleFormControl";
import {DictionaryStoreCtx} from "../../../stores/DictionaryStoreCtx";
import {SyntheticEvent} from "react";
import {LanguageCtx} from "../../../stores/LanguageCtx";
import {InputLabel} from "@mui/material";
import {AuthStoreCtx} from "../../../stores/AuthStoreCtx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export const Recover = observer(function Recover() {
    const [username, setUsername] = React.useState<string>('');
    const [error_username, setErrorUsername] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [error_email, setErrorEmail] = React.useState<string>('');
    const [recover_account_send, setRecoverAccountSend] = React.useState<boolean>(false);
    const [recover_password_send, setRecoverPasswordSend] = React.useState<boolean>(false);
    const authStore = React.useContext(AuthStoreCtx);
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);

    function onChangeUsername(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        event.preventDefault();
        setUsername(event.currentTarget.value);
    }
    function onChangeEmail(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        event.preventDefault();
        setEmail(event.currentTarget.value);
    }
    async function recoverPassword() {
        try {
            if (!username) {
                return;
            }
            const [success, resp] = await authStore.requestPasswordRecover({username: username});
            if (!success) {
                if (resp.error === 400) {
                    setErrorUsername('Invalid or non existing username');
                }
            } else {
                setRecoverPasswordSend(true);
            }
        } catch (e) {
            console.log(e);
            setErrorUsername('General failure, reload page');
        }
    }
    async function recoverAccount() {
        try {
            const [success, resp] = await authStore.requestAccountRecover({email: email});
            if (!success) {
                if (resp.error === 400) {
                    setErrorEmail('Invalid email address');
                }
            } else {
                setRecoverAccountSend(true);
            }
        } catch (e) {
            setErrorEmail('General failure, reload page');
        }
    }

    return <div style={{width: '100%'}}>
        <Typography>Recover lost password</Typography>
        {recover_password_send ?
            <Typography>{dictionaryStore.get(language, 'recover-send', 'Recovery mail send, check inbox')}</Typography> :
            <><SimpleFormControl
                inline
                name={'username'}
                label={dictionaryStore.get(language, 'acc-username', 'Username')}
                style={{maxWidth: '22em', width: '100%'}}
                inputProps={{
                    value: username,
                    onChange: onChangeUsername,
                    autoCapitalize: "none",
                }}
                errorFields={error_username}
                labelComponent={InputLabel}
            />
                <Button variant={"contained"} color={"primary"} onClick={recoverPassword}>{dictionaryStore.get(language, 'recover-acc-btn', "Recover")}</Button></>
        }
        <hr />
        <Typography>Recover lost username</Typography>
        {recover_account_send ?
            <Typography>{dictionaryStore.get(language, 'recover-send', 'Recovery mail send, check inbox')}</Typography> :
            <><SimpleFormControl
                inline
                name={'email'}
                label={dictionaryStore.get(language, 'recover-acc-email', 'Email address used to register')}
                style={{maxWidth: '22em', width: '100%'}}
                inputProps={{
                    value: email,
                    onChange: onChangeEmail,
                }}
                errorFields={error_email}
                labelComponent={InputLabel}
            />
                <Button variant={"contained"} color={"primary"} onClick={recoverAccount}>{dictionaryStore.get(language, 'recover-acc-btn', "Recover")}</Button></>
        }
    </div>;
});
