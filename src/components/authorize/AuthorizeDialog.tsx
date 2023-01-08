// @flow

import { Button, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { DictionaryStoreCtx } from '../../stores/DictionaryStoreCtx';
import {LanguageCtx} from "../../stores/LanguageCtx";
import {SimpleResponsiveFormDialog} from "../forms/SimpleResponsiveFormDialog";
import LockIcon from '@mui/icons-material/Lock';
import { Signin } from './signin/Signin';
import { Register } from './register/Register';
import { Recover } from './recover/Recover';


type PropTy = {
    open: boolean,
    onClose: (e: React.SyntheticEvent<HTMLElement>) => unknown,
    onSubmitSignin: (e: React.SyntheticEvent<HTMLElement>, d: FormData) => unknown,
    onSubmitRegister: (e: React.SyntheticEvent<HTMLElement>, d: FormData) => unknown,
};

type FormContentPropTy =  {
    handleClose: (e: React.SyntheticEvent<HTMLElement>) => unknown,
    onSubmitSignin: (e: React.SyntheticEvent<HTMLElement>, d: FormData) => unknown,
    onSubmitRegister: (e: React.SyntheticEvent<HTMLElement>, d: FormData) => unknown,
}

function FormContent(props:FormContentPropTy){
    const [view, setView] = React.useState<string>('signin');
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const [language,] = React.useContext(LanguageCtx);

    function handleChange(event: unknown, newValue: string) {
        setView(newValue)
    }
    const {handleClose, onSubmitSignin, onSubmitRegister} = props;

    const actions = [
        <Button
            type={"reset"}
            color={"secondary"}
            style={{ float: 'left' }}
            key={'reset'}
        >{dictionaryStore.get(language, 'btn-reset', "Reset")}</Button>,
        <Button
            color={"primary"}
            onClick={handleClose}
            key={'cancel'}
        >{dictionaryStore.get(language, 'btn-cancel', "Cancel")}</Button>,
        <Button
            type={"submit"}
            variant={"contained"}
            color={"primary"}
            key={'submit'}
        >{dictionaryStore.get(language, 'btn-login', "Login")}</Button>,
    ];

    return <>
        <Tabs
            value={view}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant={'fullWidth'}
        >
            <Tab value={'signin'} label={dictionaryStore.get(language, 'auth-login-tab', 'Log in')}/>
            <Tab value={'register'} label={dictionaryStore.get(language, 'auth-register-tab', 'New account')}/>
            <Tab value={'recover'} label={dictionaryStore.get(language, 'auth-recover-tab', 'Recover')}/>
        </Tabs>
        {view === 'signin' &&
            <Signin onSubmit={onSubmitSignin} actions={actions} handleRequestPasswordRecover={(e) => {
                handleChange(e, 'recover');
                return false;
            }} />
        }
        {view === 'register' &&
            <Register onSubmit={onSubmitRegister} actions={actions}
                      handleRequestPasswordRecover={(e: unknown) => handleChange(e, 'recover')}/>
        }
        {view === 'recover' &&
            <Recover/>
        }
    </>
}


export const AuthorizeDialog = function(props: PropTy) {
    const {onSubmitSignin, onSubmitRegister, open, onClose} = props;
    const TForm = function (props: {handleClose: (e: React.SyntheticEvent<HTMLElement>) => unknown}) {
        return <FormContent handleClose={props.handleClose}
                            onSubmitRegister={onSubmitRegister}
                            onSubmitSignin={onSubmitSignin}/>
    };

    return <SimpleResponsiveFormDialog
        open={open}
        onClose={onClose}
        onSubmit={() => {}}
        formComponent={TForm}
        dialogProps={{'aria-labelledby': "login window", 'aria-describedby': "login window"}}
        icon={<LockIcon/>}
    />
};
