
import * as React from 'react';
import {observer} from "mobx-react-lite";
import {MouseEvent} from "react";
import {Popover, PopoverPosition, styled, Typography} from "@mui/material";

type PropTy = {
    errMsg: string,
    anchorEl?: EventTarget,
    popperProps: {
        id: string | undefined
        anchorEl: HTMLElement | undefined
        anchorPosition: PopoverPosition | undefined
        anchorReference: 'anchorEl' | 'anchorPosition'
        open: boolean
        onClose: () => void
        onMouseLeave: (event: MouseEvent<any>) => void
        disableAutoFocus?: boolean
        disableEnforceFocus?: boolean
        disableRestoreFocus?: boolean
    }
}
const StyledDiv = styled('div')(({ theme }) => `
  padding: ${theme.spacing(1)}
`);
const StyledTypography = styled(Typography)(({ theme }) => `
  padding: 2px;
`);
//const useStyles = makeStyles(outer_styles);
export const ErrorPopper = observer(function ErrorPopper(props: PropTy) {
    const {errMsg, popperProps} = props;

    return <Popover
        {...popperProps}
        id="error-popper"
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        //TODO: fix below
        //container={popperProps.anchorEl ? popperProps.anchorEl.parentNode : null}
    >
        <StyledDiv>
            <StyledTypography>{errMsg}</StyledTypography>
        </StyledDiv>
    </Popover>
});
