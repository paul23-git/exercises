// @flow


import * as React from 'react';
import {DialogProps, Theme, useMediaQuery} from "@mui/material";
import {observer} from "mobx-react-lite";
import {StyledDialogContent, StyledFormAvatar, StyledResponsiveForm} from "./styles";

type PropTy = {
    open: boolean,
    onClose: (e: React.SyntheticEvent<HTMLElement>) => unknown,
    onSubmit: (e: React.SyntheticEvent<HTMLElement>, d: FormData) => unknown,
    formComponent: React.ComponentType<{handleClose: (e: React.SyntheticEvent<HTMLElement>) => unknown, submit: (e: React.SyntheticEvent<HTMLElement>) => unknown}>,
    dialogProps?: Partial<DialogProps>|undefined|null,
    children?: React.ReactNode|undefined,
    icon?: React.ReactNode|undefined,
    formProps?: Record<string, any>,
}




export const SimpleResponsiveFormDialog = observer(function SimpleResponsiveFormDialog(props: PropTy) {
    const {open, onClose, formComponent:MyForm, dialogProps, children, icon, formProps, onSubmit} = props;

    const isMobile:boolean = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));

    function submit(e: React.SyntheticEvent<HTMLElement>) {
        e.preventDefault();
        const q = e.target;
        if (q instanceof HTMLFormElement) {
            const data = new FormData(q);
            onSubmit(e, data);
        }
    }
    return (
        <StyledResponsiveForm
            {...dialogProps}
            fullScreen={isMobile}
            open={open}
            onClose={onClose}
        >
            <StyledDialogContent>
                {icon && <StyledFormAvatar>
                    {icon}
                </StyledFormAvatar>}
                <>{children}</>
                <MyForm {...formProps} handleClose={onClose} submit={submit}/>
            </StyledDialogContent>
        </StyledResponsiveForm>
    );
});
