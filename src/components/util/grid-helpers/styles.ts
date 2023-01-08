// export const eventDateStyles: ((theme:ThemeTy) => {+[string]: {+[string]: mixed}}) = (theme: ThemeTy) => ({
//     gridMain: {
//         display: 'grid',
//         position: 'relative',
//         width: `100%`,
//         margin: theme.spacing(0),
//         marginTop: 0,
//         alignItems: 'center',
//         gridTemplateColumns: 'max-content max-content max-content max-content',
//         gridAutoFlow: 'dense',
//     },
//     gridRowSpanner: {
//         gridColumn: `1 / -1`,
//         borderTopColor: 'black',
//         borderTopWidth: 1,
//         borderTopStyle: 'solid',
//         minHeight: 48,
//
//     },
//
//     gridMainCell: {
//         paddingLeft: 1,
//         paddingRight: theme.spacing(1),
//         height: '100%',
//         display: 'flex',
//         alignItems: 'flex-start',
//         minHeight: theme.spacing(4.5),
//         borderBottom: '1px solid #dfdfdf',
//         paddingBottom: theme.spacing(0.5),
//         '&:nth-last-child(-n+4)': {
//             borderBottom: 'none',
//             paddingBottom: theme.spacing(0),
//         }
//     },
//     gridHeaderCell: {
//         alignItems: 'flex-end',
//         paddingBottom: theme.spacing(0),
//     },
//
// });
import {css, styled, Theme} from "@mui/material";

export const StyledGridRowSpanner = styled('div')(({theme}: {theme: Theme}) => css`
  grid-column: 1 / -1;
  border-top-color: lightgrey;
  border-top-width: 1px;
  border-top-style: solid;
  min-height: 48px;
  padding-left: ${theme.spacing(4)};
  padding-right: ${theme.spacing(4)};
  ${theme.breakpoints.down('sm')} {
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
  }
  margin-bottom: ${theme.spacing(2)};
`);
export const StyledHeaderCell = styled('div')(({theme}: {theme: Theme}) => css`
  padding-left: 1px;
  padding-right: ${theme.spacing(1)};
  height: 100%;
  display: flex;
  align-items: flex-end;
  min-height: unset;
  
`);

export const StyledGridMainCell = styled('div')(({theme}: {theme: Theme}) => css`
  padding-left: 1px;
  padding-right: ${theme.spacing(1)};
  height: 100%;
  display: flex;
  align-items: center;
  border-top-color: black;
  border-top-width: 1px;
  border-top-style: solid; 
  width: 100%;
`);
export const StyledGridRowWrapper = styled("div")(({theme}: {theme: Theme}) => css`
  display: contents;
  cursor: pointer;
  &:hover div {
    background-color: ${theme.palette.grey['200']};
  }
`);
