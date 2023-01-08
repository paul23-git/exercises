// @flow

import * as React from 'react';
//import classNames from 'classnames';

import IconButton from '@mui/material/IconButton';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
//
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router";
import {LanguageCtx} from "../../stores/LanguageCtx";
//import {styles as outer_styles} from "../styles";
//import type {CssClassesTy, ThemeTy} from "../../custom-types/TypeDefs";
// import {AccountTopBarIcon} from "./AccountTopBarIcon";
// import {LanguageTopBarSelector} from "./LanguageTopBarSelector";
import {css, styled, Theme} from "@mui/material";
import {baseStyle} from "./styles";
import {TopBarMenu} from "./TopBarMenu";


const styles = (theme: Theme) => ({
    toolbar: {
        paddingRight: theme.spacing(2), // keep right padding when drawer closed
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            paddingRight: theme.spacing(0),
        },
    },
    title: {
        flexGrow: 1,
        fontFamily: "din-2014, sans-serif",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "1.5rem",
    },
});

const StyledAppBar = styled(AppBar)(({theme}) => `
z-index: ${theme.zIndex.drawer} + 1;
transition: ${theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
})}
`);

const StyledToolbar = styled(Toolbar)(({theme}) => `
    padding-right: ${theme.spacing(2)}; // keep right padding when drawer closed
    text-align: center;
    ${theme.breakpoints.down('sm')} {
        padding-right: ${theme.spacing(0)};
    }
`);
//     [theme.breakpoints.down('xs')]: {
//     paddingRight: theme.spacing(0),
// },
const base =  ({theme}: {theme: Theme}) => `
margin-left: ${theme.spacing(8)};
max-height: 48px;
`;

// const StyledMenuButton = styled(IconButton)(`${base}`);

type PropTy = {
    onOpenDrawer: () => unknown,
    onRequestLogin: () => unknown,
    onRequestLogout: () => unknown,
    onOpenAccountManagement: () => unknown,
    onOpenMessageCenter: () => unknown,
    currentLanguage: string,
    loggedIn: boolean,
}
//
// const baseStyle = ({theme}: {theme: Theme}) => css`
// margin-left: ${theme.spacing(8)};
// max-height: 48px;
// `;
//
// const baseStyle = css`
// margin-left: 16px;
// max-height: 48px;
// `;


const StyledImage = styled('img')(({theme}: {theme: Theme}) => css`
${typeof baseStyle === 'string' ? baseStyle : baseStyle({theme})} 
`);

// export const TopBar = observer(function TopBar(props: PropTy) {
//     // @ts-ignore
//     return   <div
//         // @ts-ignore
//         css={css`
//       ${base};
//       background-color: #eee;
//     `}
//     >
//         This is hotpink.
//     </div>
// });
// const useStyles = makeStyles(outer_styles);
// const useLocalStyles = makeStyles(styles);

export const TopBar = observer(function TopBar(props: PropTy) {
    const {
        onOpenDrawer,
        onRequestLogin,
        onRequestLogout,
        onOpenAccountManagement,
        onOpenMessageCenter,
        loggedIn,
    } = props;
    const [language,] = React.useContext(LanguageCtx);
    const navigator = useNavigate();


    function handleDrawerOpen() {
        onOpenDrawer();
    }

    return (
        <StyledAppBar
            position="relative"
        >
            <StyledToolbar disableGutters={true}>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{
                        flexGrow: 1,
                        fontFamily: "din-2014, sans-serif",
                        fontWeight: 600,
                        fontStyle: "normal",
                        fontSize: "1.5rem",
                    }}
                    // className={localClasses.title}
                    // style={{
                    //     fontFamily: "din-2014, sans-serif",
                    //     fontWeight: 600,
                    //     fontStyle: "normal",
                    //     fontSize: "1.5rem",
                    // }}
                >
                    {'Exercise planner'}
                </Typography>
                <TopBarMenu onOpenAccountManagement={onOpenAccountManagement}
                            onOpenMessageCenter={onOpenMessageCenter}
                            onRequestLogin={onRequestLogin}
                            onRequestLogout={onRequestLogout}
                            loggedIn={loggedIn}
                />
                {/*<AccountTopBarIcon onRequestLogin={onRequestLogin}*/}
                {/*                   onRequestLogout={onRequestLogout}*/}
                {/*                   onOpenAccountManagement={onOpenAccountManagement}*/}
                {/*                   onOpenMessageCenter={onOpenMessageCenter}*/}
                {/*                   loggedIn={loggedIn}*/}
                {/*/>*/}
                {/*{!loggedIn && <LanguageTopBarSelector*/}
                {/*    currentLanguage={language}*/}
                {/*/>}*/}
            </StyledToolbar>
        </StyledAppBar>

    )
});

