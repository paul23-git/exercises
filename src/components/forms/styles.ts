import {Avatar, css, Dialog, DialogContent, styled, Theme} from "@mui/material";

export const StyledResponsiveForm = styled(Dialog)(({theme}: {theme: Theme}) => css`
  display: block;
  ${theme.breakpoints.up(602+16)} {
    margin-left: auto;
    maring-right: auto;
  }
  ${theme.breakpoints.up('sm')} {
    margin-left: ${theme.spacing(3)};
    maring-right: ${theme.spacing(3)};
    width: auto;
  }
`);

export const StyledDialogContent = styled(DialogContent)(({theme}: {theme: Theme}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(3)};
    padding-left: ${theme.spacing(3)};
    padding-right: ${theme.spacing(3)};
  }  
`);

export const StyledWideDialogContent = styled(DialogContent)(({theme}: {theme: Theme}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(3)};
    padding-left: ${theme.spacing(3)};
    padding-right: ${theme.spacing(3)};
  }
  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(4)};
    padding-left: ${theme.spacing(18)};
    padding-right: ${theme.spacing(18)};
  }  
`);

export const StyledFormAvatar = styled(Avatar)(({theme}: {theme: Theme}) => css`
  display: flex;
  margin: ${theme.spacing(1)};
  background-color: ${theme.palette.primary.main};
`);