import {Box, css, Paper, styled, Theme, Toolbar} from "@mui/material";


export const MenuButton = css`
marginLeft: 8px;
max-height: 48px;
`;
export const formDialogContent = ({theme}: {theme: Theme}) => css`
  paddingLeft: ${theme.spacing(3)};
  paddingRight: ${theme.spacing(3)};
  padding: ${theme.spacing(3)}; 
`;
export const mainDiv = ({theme}: {theme: Theme}) => css`
  flex-grow: 1;
  flex-direction: column;
  position: relative;
  display: flex;
  height: 100%;
  overflow: auto;
  & :focus {
    border-radius: 0;
    outline: 0;
  }
`;
export const StyledMainDiv = styled('div')(mainDiv);
export const content = ({theme}: {theme: Theme}) => css`
  flex-grow: 1;
  overflow: hidden;
  position: relative;
`;
export const StyledContentDiv = styled('div')(content);

export const viewRoot = ({theme}: {theme: Theme}) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(1)};
  padding-top: ${theme.spacing(3)};
  ${theme.breakpoints.down('sm')} {
    padding-left: ${theme.spacing(1)};
  }
  ${theme.breakpoints.down('xs')} {
    padding-left: ${theme.spacing(0.5)};
    padding-right: ${theme.spacing(0.5)};
  }

`;
export const StyledViewRootDiv = styled('div')(viewRoot);

export const toolbar = ({theme}: {theme: Theme}) => css`
  margin-top: ${theme.spacing(-3)};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.palette.grey[300]};
  border-bottom-style: solid;
  min-height: ${theme.spacing(6)};
`;
export const StyledToolbarDiv = styled('div')(toolbar);
export const hdrMain = ({theme}: {theme: Theme}) => css`
  flex-shrink: 1;
  flex-grow: 1;
  width: 180px;
`;
export const StyledHdrMainDiv = styled('div')(hdrMain);
export const StyledToolbar = styled(Toolbar)(toolbar);
// ${theme => theme.breakpoints.up("sm")} {
//     padding-left: ${theme.spacing(1);
//   }
// {
//     marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//     maxHeight: 48,
//     [theme.breakpoints.down('sm')]: {
//     marginLeft: theme.spacing(0.5),
//         marginRight: theme.spacing(0.5),
// },
//     [theme.breakpoints.down('xs')]: {
//     marginLeft: theme.spacing(0),
//         marginRight: theme.spacing(0),
// },
// }

// height: '100%',
//     position: 'relative',
//     overflow: 'auto',
//
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: `calc(${theme.spacing(4)}px)`,
export const pageRoot = ({theme}: {theme: Theme}) => css`
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  min-height: ${theme.spacing(4)};
`;
export const StyledPageRootDiv = styled('div')(pageRoot);
export const pageMain  = ({theme}: {theme: Theme}) => css`
  margin: ${theme.spacing(0.25)};
  &>:first-of-type {
    margin-top: ${theme.spacing(2)};
  }
  &>:last-child {
    margin-bottom: ${theme.spacing(1)};
  }
`;
export const StyledPageMainPaper = styled(Paper)(pageMain);
export const insidePaper  = ({theme, noheader}: {theme: Theme, noheader: boolean}) => css`
  padding: ${theme.spacing(2)};
  padding-top: ${theme.spacing(noheader ? 2 : 0.25)};
  ${theme.breakpoints.down('sm')} {
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
  }
`;
export const StyledInsidePaperDiv = styled(Box)(insidePaper);
export const linkButton = ({theme}: {theme: Theme}) => css`
  background: none!important;
  border: none;
  margin: 0;
  padding: 0;
  color: ${theme.palette.primary.main};
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
`;
export const StyledLinkButton = styled('button')(linkButton);
export const indent = ({theme, count}: {theme: Theme, count: number}) => css`
  margin-left: ${theme.spacing(count)}
`;
export const StyledIndentDiv = styled(Box)(indent);