import * as React from 'react';
import {observer} from "mobx-react-lite";
import {IconButton, Input, InputAdornment, InputProps} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';



export const PasswordInput = observer(function(props: InputProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    return <>
        <Input
            {...props}
            type={showPassword ? "text" : "password"}
            autoCapitalize={"none"}
            endAdornment={<InputAdornment position="end">
                <IconButton aria-label="Toggle password visibility" onClick={(e) => setShowPassword(p => !p)}>
                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
            </InputAdornment>}
        />
    </>;
});
