import * as React from "react";
import {useCookies} from "react-cookie";
import {styled} from "@mui/material";
import {observer} from "mobx-react-lite";
import SettingsIcon from "@mui/icons-material/Settings";
import {DictionaryManagerCtx} from "../../stores/DictionaryManagerCtx";
import {DictionaryStoreCtx} from "../../stores/DictionaryStoreCtx";
import {AuthStoreCtx} from "../../stores/AuthStoreCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {Route, Routes, useLocation, useNavigate} from "react-router";
import { IRouteData } from "../../interfaces/IRouteData";
import { DebugLanguageViewer } from "../debug/DebugLanguageViewer";
import {mainDiv, StyledContentDiv} from "../styles/shared-styles";
import { AuthorizeDialog } from "../authorize/AuthorizeDialog";
import {Home} from "../home/home";
import {useEffect, useState} from "react";
import { DimensionContext } from "../../stores/DimensionCtx";


type PropTy = {
    setDoLoginCB: (loginFunction: ((logged: boolean) => void)) => void,
    setLoginState: ((logged: boolean) => void),
    expandTopSideBarElemsCB: (elements: Array<IRouteData | React.ReactNode>) => void,
}
// const styles = (theme: Theme) => ({
//     toolbar: {
//         paddingRight: theme.spacing(2), // keep right padding when drawer closed
//         textAlign: 'center',
//         [theme.breakpoints.down('xs')]: {
//             paddingRight: theme.spacing(0),
//         },
//     },
//     title: {
//         flexGrow: 1,
//         fontFamily: "din-2014, sans-serif",
//         fontWeight: 600,
//         fontStyle: "normal",
//         fontSize: "1.5rem",
//     },
// });

const StyledMainDiv = styled('main')(mainDiv);

export const MainPlannerBase = observer(function (props: PropTy) {
    const {setDoLoginCB, setLoginState, expandTopSideBarElemsCB} = props;
    const [debugKeyTranslations, setDebugKeyTranslations] = React.useState(false);
    const dictionaryStore = React.useContext(DictionaryStoreCtx);
    const dictionaryManager = React.useContext(DictionaryManagerCtx);
    const authStore = React.useContext(AuthStoreCtx);
    const mainDivRef = React.useRef<HTMLDivElement|null>(null);

    const isRootOrSiteAdmin = authStore.isRootOrSiteAdmin;

    const [open_login, setOpenLogin] = React.useState(false);
    const [language, matchLanguage] = React.useContext(LanguageCtx);
    const [cookie, ] = useCookies(["language"]);

    const location = useLocation();
    const navigate = useNavigate();
    const [didRedirect, setDidRedirect] = React.useState(false);

    // const match = useMatch();
    // const matchUrl = match.url;
    // const matchUrlLength = matchUrl.length;
    const loggedIn = authStore.login;
    const busyLoggingIn = authStore.initialLoginCheck;
    const path = location.pathname;
    const langList = dictionaryManager.getLanguageList();
    const user = authStore.user;


    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    React.useEffect(() => {
        function handleResize() {
            if (mainDivRef.current) {
                setWidth(mainDivRef.current.offsetWidth);
                setHeight(mainDivRef.current.offsetHeight);
            }
        }
        window.addEventListener('resize', handleResize)
    }, []);
    useEffect(() => {
        if (mainDivRef.current) {
            setWidth(mainDivRef.current.offsetWidth);
            setHeight(mainDivRef.current.offsetHeight);
        } else {
            console.log("ref is null")
        }
    });



    React.useEffect(() => {
        async function doLogin(login: boolean) {
            if (login) {
                openLoginForm();
            } else {
                await logout();
            }
        }

        async function logout() {
            await authStore.doLogout();
        }
        function openLoginForm() {
            setOpenLogin(true);
        }
        //setDoLoginCB((oldstate: ?((boolean) => mixed)) => doLogin);
        setDoLoginCB(doLogin); // if using states we need to use the form with oldstate => newstate due to intracities
    }, [authStore, setDoLoginCB, setOpenLogin]);
    React.useEffect(() => {
        setLoginState(loggedIn);
    }, [loggedIn, setLoginState]);
    const hasLanguage = dictionaryStore.hasLanguage(language);
    const loggedUserIsVerified = !authStore.user || authStore.user.verified;
    const showDebugForced = dictionaryManager.showDebugForced;
    React.useEffect(() => {
        dictionaryManager.showDebug = showDebugForced || debugKeyTranslations;
    }, [dictionaryManager, debugKeyTranslations, showDebugForced]);
    const showDebug = dictionaryManager.showDebug;
    React.useEffect(() => {
        const out = [];
        if (isRootOrSiteAdmin) {
            out.push({
                icon: <SettingsIcon/>,
                url: matchLanguage +'/admin',
                name: dictionaryStore.get(language, '/admin', 'Root tools'),
            });
        }
        // if (userHasEnrollments) {
        //     out.push(
        //         <Divider/>,
        //         new RouteData({
        //             icon: <DashBoardBadgeIcon verified={loggedUserIsVerified}/>,
        //             url: matchLanguage + '/my-enrollments',
        //             name: dictionaryStore.get(language, '/my-enrollments', 'My enrollments'),
        //         }),
        //     );
        // }
        if (out.length > 0) {
            expandTopSideBarElemsCB(out);
        }
    }, [
        isRootOrSiteAdmin,
        showDebug,
        dictionaryStore,
        language,
        matchLanguage,
        hasLanguage,
        expandTopSideBarElemsCB,
        loggedUserIsVerified,
    ]);


    React.useEffect(() => {
        if (!busyLoggingIn) {
            let preferedLanguage: null|string = null;
            if (loggedIn) {
                preferedLanguage = user ? user.language : null;
            }
            if (!preferedLanguage) {
                if (cookie.language && cookie.language.match(/[a-z]{2,3}-[a-z]{2}/)) {
                    preferedLanguage = cookie.language;
                }
            }
            if (!preferedLanguage) {
                if (langList) {
                    const l: string = navigator.language.toLowerCase() ||
                        // @ts-ignore
                        navigator.userLanguage.toLowerCase();
                    let actualLanguage: undefined|string = undefined;
                    if (l.match(/[a-z]{2,3}-[a-z]{2}/)) {
                        actualLanguage = l;
                    } else if (l.match(/[a-z]{2}/)) {
                        actualLanguage = l + '-' + l;
                    }
                    if (actualLanguage && langList.has(actualLanguage)) {
                        preferedLanguage = actualLanguage;
                    }
                }
            }
            if (preferedLanguage) {
                const r = path.match(/\/([a-z]{2,3}-[a-z]{2})(?=(\/|$))(.*)/);
                if (!r || r[1] !== preferedLanguage) {
                    const basepath = r ? r[3] : path;
                    const newLoc = {
                        search: location.search,
                        hash: location.hash,
                        pathname: '/' + preferedLanguage + basepath,
                    };
                    navigate(newLoc, {replace: true, state: location.state});
                    setDidRedirect(true);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, cookie.language, path, loggedIn, busyLoggingIn, didRedirect, setDidRedirect, langList]);

    // React.useEffect(() => {
    //     function PathToTitle(path: string): string {
    //         const toks = path.split('/');
    //         const event_index = toks.indexOf("events");
    //         if (event_index > 0 && toks.length > event_index+1) {
    //             const event_id = toks[event_index+1];
    //             const event = eventStore.findEvent(Number.parseInt(event_id));
    //             return `AllSports - ${event ? event.getName(language) : event_id}`;
    //         }
    //         const org_index = toks.indexOf("organizations");
    //         if (org_index > 0 && toks.length > org_index+1) {
    //             const org_name = toks[org_index+1];
    //             const organization = organizationStore.findBySafeName(org_name);
    //             return `AllSports - ${organization ? organization.name : org_name}`;
    //         }
    //         return "AllSports";
    //     }
    //
    //     const urlDisposer = reaction(
    //         () => {
    //             return routingStore.location.pathname +
    //                 (eventStore.last_reload || '').toString() +
    //                 JSON.stringify(nullOrUndefined(organizationStore.filter) ? null : organizationStore.filter);
    //         },
    //         () => {
    //             if (routingStore.location.pathname) {
    //                 document.title = PathToTitle(routingStore.location.pathname);
    //             }
    //         },
    //         {fireImmediately: true},
    //     );
    //     return () => {
    //         urlDisposer();
    //     }
    // }, [organizationStore, routingStore, eventStore, language]);





    function closeLoginForm() {
        setOpenLogin(false);
    }

    async function submitLoginInfo(e: any, data: FormData) {
        const res = await authStore.doLogin(data);
        if (res) {
            closeLoginForm();
        }
    }

    async function submitRegistrationInfo(e: any, data: FormData) {
        const res = await authStore.registerUser(data);
        if (res) {
            closeLoginForm();
        }
        // TODO: HANDLE ERROR
    }




    return <>
        {dictionaryStore.showDebugDisplay && <DebugLanguageViewer/>}
        <StyledMainDiv
            onKeyDown={(e) => {
                if (isRootOrSiteAdmin && !debugKeyTranslations && e.ctrlKey && e.altKey && e.shiftKey) {
                    setDebugKeyTranslations(true);
                }
            }}
            onKeyUp={(e) => {
                if (debugKeyTranslations && (!e.ctrlKey || !e.altKey || !e.shiftKey)) {
                    setDebugKeyTranslations(false)
                }
            }}
            tabIndex={-1}
            //@ts-ignore
            autoFocus={true}
            ref={mainDivRef}
        >
            {/*errorStore.count > 0 && <div style={{
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 'auto',
            }}>
                <ErrorViewer maxErrors={2}/>
            </div>*/}
            <DimensionContext.Provider value={{
                width: width,
                height: height,
            }}>
                <StyledContentDiv>
                    <Routes>
                        <Route path={'/'}
                               element={<Home/>}
                        />
                    </Routes>
                </StyledContentDiv>
                <AuthorizeDialog open={open_login && !loggedIn}
                                 onClose={closeLoginForm}
                                 onSubmitSignin={submitLoginInfo}
                                 onSubmitRegister={submitRegistrationInfo}
                />
            </DimensionContext.Provider>
        </StyledMainDiv>
    </>

});

/*

*/
