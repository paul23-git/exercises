
import * as React from 'react';
import {observer} from "mobx-react-lite";
//import {styles as outer_styles} from "../Styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {makeStyles} from '@mui/material/styles';
import {css, Divider, styled, Theme} from "@mui/material";
import {baseStyle} from "./styles";
import MenuIcon from "@mui/icons-material/Menu";
import {DictionaryManagerCtx} from "../../stores/DictionaryManagerCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
//import {useStores} from "../stores/useStores";

type PropTy = {
    onRequestLogin: () => unknown,
    onRequestLogout: () => unknown,
    onOpenAccountManagement: () => unknown,
    onOpenMessageCenter: () => unknown,
    loggedIn: boolean,
}

//const useStyles = makeStyles(outer_styles);
const StyledMenuButton = styled(IconButton)(({theme}: {theme: Theme}) => css`
${typeof baseStyle === 'string' ? baseStyle : baseStyle({theme})} 
`);
export const TopBarMenu = observer(function TopBarMenu(props: PropTy) {
    const {onRequestLogin, onRequestLogout, onOpenAccountManagement, onOpenMessageCenter, loggedIn} = props;
    //const classes = useStyles();
    //const { authStore } = useStores();
    const [anchorEl, setAnchorEl] = React.useState<null|HTMLButtonElement>(null);
    const dictionaryManager = React.useContext(DictionaryManagerCtx);
    const dictionaryStore = React.useMemo(() => dictionaryManager.addDictionaryGroup('bondinet'), [dictionaryManager]);
    const [language,] = React.useContext(LanguageCtx);

    function handleLogin() {
        onRequestLogin();
    }

    function handleLogout() {
        onRequestLogout();
    }

    function handleOpenAccountManagement() {
        onOpenAccountManagement();
    }

    function handleOpenMessageCenter() {
        onOpenMessageCenter();
    }

    function handleOpen(event: React.SyntheticEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose(reason?: string | null | void) {
        setAnchorEl(null);
        switch (reason) {
            case 'login':
                handleLogin();
                break;
            case 'logout':
                handleLogout();
                break;
            case "profile":
                //handleOpenAccountManagement();
                break;
            case "contact":
                //handleOpenMessageCenter();
                break;
            default:
                break;
        }
    }


    const LoggedSpecificElements = loggedIn ? [
        <MenuItem onClick={() => handleClose('profile')} key={'profile'}>
            {dictionaryStore.get(language, 'hdr-profile', "Profile")}
        </MenuItem>,
        <MenuItem onClick={() => handleClose('contact')} key={'contact'}>
            {dictionaryStore.get(language, 'hdr-messages', "Messages")}
        </MenuItem>,
        <MenuItem onClick={() => handleClose('logout')} key={'logout'}>
            {dictionaryStore.get(language, 'hdr-logout', "Logout")}
        </MenuItem>,
    ] : [
        <MenuItem onClick={() => handleClose('login')} key={'login'}>
            {dictionaryStore.get(language, 'hdr-login', "Login")}
        </MenuItem>
    ]
    return <>
        <StyledMenuButton
            color="inherit"
            aria-label="Open"
            onClick={handleOpen}
        >
            <MenuIcon />
        </StyledMenuButton>
        <Menu
            id="shope-menu"
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClose={() => handleClose()}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={() => handleClose('order')}>{"Order Something"}</MenuItem>
            <Divider/>
            {LoggedSpecificElements}
        </Menu>
    </>;
});
