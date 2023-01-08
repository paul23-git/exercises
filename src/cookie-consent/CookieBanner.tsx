//import '../index.css';
import './banner.css';

import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {observer} from "mobx-react-lite";
// import {styles as outer_styles} from "../Styles";
import {useCookies} from "react-cookie";


import { styled } from '@mui/material/styles';
import {init} from "./initCookies";

const BottomToolbarBanner = styled(Toolbar)(({ theme }) => `
    width: 100%;
    position: fixed;
    bottom: 0;   
    background-color: ${theme.palette.grey[200]};
`);
// import { makeStyles } from "@material-ui/core/styles";

// const styles = (theme:Theme) => (createStyles({
//     stickToBottom: {
//         width: '100%',
//         position: 'fixed',
//         bottom: 0,
//         backgroundColor: theme.palette.grey[200],
//         minHeight: theme.spacing(6),
//         zIndex: 1000000,
//     },
// }));

type PropTy = {
}
//const merged: Styles<*> = (theme:Theme) => ({...outer_styles(theme), ...styles(theme)});
// const useStyles =
//     makeStyles((theme:Theme) => (createStyles({...outer_styles(theme), ...styles(theme)})));

const CookieBanner = observer(function CookieBanner(prop:PropTy) {
    const [cookies, setCookie, ] = useCookies(["consentfunctional", "consentoptional", "consentmarketing"]);
    const [handled, setHandled] = React.useState<boolean>(false);
    const old = React.useRef<{[key: string]: string}>({});
    React.useEffect(() => {
        if (cookies.consentfunctional !== undefined &&
            cookies.consentoptional !== undefined &&
            cookies.consentmarketing !== undefined) {
            setHandled(true);
        }
    }, [cookies]);
    React.useEffect( () => {
        if (cookies.consentmarketing === "1") {
            const changed = [];
            for (const [k,v] of Object.entries(cookies)) {
                if (old.current[k] !== v) {
                    old.current[k] = v;
                    changed.push(k);
                }
            }
            if (changed.length > 0) {
                init(cookies, changed);
            }
        }
    }, [cookies]);

    function onAccept() {
        setCookie("consentfunctional", "1", {expires: new Date('01-01-2038'), path: '/'});
        setCookie("consentoptional", "1", {expires: new Date('01-01-2038'), path: '/'});
        setCookie("consentmarketing", "1", {expires: new Date('01-01-2038'), path: '/'});
    }
    function onReject() {
        setHandled(true);
    }

    //const classes = useStyles();
    return <>{!handled && <BottomToolbarBanner className={'bottombanner'}>
        <Typography style={{paddingRight: 8}}>{"This site uses cookies to improve website performance, do you accept?"}</Typography>
        <Button variant={"contained"} color={"primary"} onClick={onAccept}>{"Accept all"}</Button>
        <Button variant={"outlined"} color={"primary"} onClick={onReject}>{"Reject all non functional"}</Button>
    </BottomToolbarBanner>}</>
});

export {CookieBanner}
