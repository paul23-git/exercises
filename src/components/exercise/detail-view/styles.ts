import {css, styled, Theme} from "@mui/material";

export const StyledGridDiv = styled('div')(({theme}: {theme:Theme}) => css`
  display: grid;
  margin-top: ${theme.spacing(0)};
  margin-bottom: ${theme.spacing(2)};
  grid-template-columns: max-content auto;
  ${theme.breakpoints.down('sm')} {
    grid-template-columns: 1fr;
  }
`);