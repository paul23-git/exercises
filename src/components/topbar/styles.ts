import {css, Theme, styled} from "@mui/material";

export const baseStyle = ({theme}: {theme: Theme}) => css`
margin-left: ${theme.spacing(2)};
max-height: 48px;
`;
