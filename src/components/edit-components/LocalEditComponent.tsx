import * as React from "react";
import {observer} from "mobx-react-lite";
import {
    css, InputBaseComponentProps,
    InputProps,
    styled,
    TextField,
    Theme,
    Typography
} from "@mui/material";
import {InputBaseProps} from "@mui/material/InputBase";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";

export const StyledFormLabelDiv = styled('div')(({theme}: {theme:Theme}) => css`
  grid-column-start: 1;
  padding-right: ${theme.spacing(1.5)};
  margin-bottom: calc(${theme.spacing(0.5)} + 2px);
  justify-self: end;
  align-self: end;
  ${theme.breakpoints.down('sm')} {
    display: none;
  }
`);
export const StyledFormFieldDiv = styled('div')(({theme}: {theme:Theme}) => css`
  grid-column-start: auto;
`);


type PropTy = {
    name: string,
    label?: string,
    inputProps: Partial<StandardInputProps>,
    value: string,
    onChange: ((key: string, e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, value: string) => void),
    onBlur?: ((key: string, e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => Promise<void>),
    error?: string,
    readOnly?: boolean,
    type?: string,

}

export const LocalEditComponent = observer(function ({name, label, inputProps, value, onChange, onBlur, error, type='text'}: PropTy) {
    const actual_id = name;
    return <>
        <StyledFormLabelDiv><Typography>{label}</Typography></StyledFormLabelDiv>
        <StyledFormFieldDiv>
            <TextField
                variant={"standard"}
                label={(error || label || name)}
                name={name}
                type={type}
                autoComplete={label || name}
                id={actual_id}
                onChange={(e) => {
                    const t: HTMLInputElement|HTMLTextAreaElement = e.target;
                    onChange(name, e, t.value)
                }}
                onBlur={onBlur ? (e) => onBlur(name, e) : undefined}
                InputProps={inputProps}
                value={value}
                error={!!error}
                fullWidth
            />
        </StyledFormFieldDiv>

    </>
});