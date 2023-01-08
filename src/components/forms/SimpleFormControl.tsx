
import * as React from 'react'
import {FormControl, FormLabel, Input, InputProps} from "@mui/material";

type PropTy = {
    name: string,
    id?: string,
    autoComplete?: string,
    required?: boolean,
    label?: string,
    type?: string,
    errorFields?: Map<string, string> | string,
    inputElement?: React.ReactNode,
    inputProps?: Partial<InputProps>,
    inline?: boolean,
    style?: {[k: string]: unknown},
    labelComponent?: React.ComponentType<{children: undefined|React.ReactNode}>,
    margin?: "normal" | "dense" | "none" | undefined,
}

export const SimpleFormControl = function(props:PropTy) {
    const {name, id, autoComplete, required=false, label, type='text',
        errorFields, inputElement, inputProps, inline, style, labelComponent:LabelComponent=FormLabel, margin='normal'} = props;
    const actual_id = id || name;
    const mergedStyle:{[k: string]: unknown}= {...style};
    if (inline) {
        mergedStyle.verticalAlign = 'middle';
    }
    return <FormControl margin={margin}
                        required={required}
                        fullWidth={!inline}
                        error={!!errorFields && ((typeof errorFields === 'string') || errorFields.has(actual_id))}
                        sx={mergedStyle}
    >
        <LabelComponent htmlFor={actual_id}>
            {label || name}
            {errorFields && (typeof errorFields === 'string' || errorFields.has(actual_id)) ?
                ` (${typeof errorFields === 'string' ? errorFields : (errorFields.get(actual_id) || '')})` :
                ''}
        </LabelComponent>
        {inputElement || <Input
            name={name}
            type={type}
            id={actual_id}
            autoComplete={autoComplete || label || name}
            {...inputProps}
        />}
    </FormControl>
};
