import * as React from 'react';
import {observer} from "mobx-react-lite";

import {Theme, useMediaQuery} from "@mui/material";
import {Navigate, Route, Routes, useLocation, useNavigate, useParams} from "react-router";
import {DictionaryManagerCtx} from "../../stores/DictionaryManagerCtx";
import {LanguageCtx} from "../../stores/LanguageCtx";
import {CookieBanner} from "../../cookie-consent/CookieBanner";
//import {SideBar} from "../sidebar/SideBar";
import {TopBar} from "../topbar/TopBar";
import { Suspense } from 'react';
import {IRouteData} from "../../interfaces/IRouteData";
const MainPlannerContextBase = React.lazy(() => import('./MainPlannerContextBase'));


type PropTy = {
    defaultLanguage?: string,
}

type LanguageViewProps = {
    defaultLanguage: string,
}

type LanguageContentPropTy = {
    language?: string|null|undefined,
}
// const styles = (theme:ThemeTy) => {
//     return ({
//         root: {
//             display: 'flex',
//             position: 'relative',
//         },
//     })
// };
//const useStyles = makeStyles(styles);

const LanguageContent = observer(function(props: LanguageContentPropTy) {
    const {language} = props;
    const dictionaryManager = React.useContext(DictionaryManagerCtx);
    const dictionaryStore = dictionaryManager.getDictionary("entry"); // entry dict also holds main sidebar stuff
    const navigator = useNavigate();

    const shownLanguage = language || 'en-us';
    const matchLanguage = language ? '/' + language : "";

    const isSmallScreen:boolean = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
    // const [open_side, setOpenSide] = React.useState(true);
    // const [manualSide, setManualSide] = React.useState(false);
    const doLoginCBRef = React.useRef<((logged:boolean) => void)|null|undefined>();
    const [loginState, setLoginState] = React.useState<boolean>(false);
    const [extraTopSideBarItems, setExtraTopSideBarItems] = React.useState<Array<React.ReactNode|IRouteData>>([]);
    const languageProviderRef = React.useRef<[string, string]>([shownLanguage, matchLanguage]);
    React.useEffect(() => {
        languageProviderRef.current = [shownLanguage, matchLanguage];
    }, [shownLanguage, matchLanguage]);

    const hasShownLanguage = dictionaryStore && dictionaryStore.hasLanguage(shownLanguage);
    const debug = dictionaryManager.showDebug;

    // const topSideBarItems: Array<RouteData|React.Node> = React.useMemo(
    //     () => {
    //         return [
    //             new RouteData({
    //                 icon: <HomeIcon/>,
    //                 url: matchLanguage + '/home',
    //                 name: hasShownLanguage && dictionaryStore ?
    //                     dictionaryStore.get(shownLanguage, '/home', 'Home') : '',
    //             }),
    //             new RouteData({
    //                 icon: <BusinessIcon/>,
    //                 url: matchLanguage + '/organizations',
    //                 name: hasShownLanguage && dictionaryStore ?
    //                     dictionaryStore.get(shownLanguage, '/organizations', 'Organizations') : '',
    //                 viewHandlesSubRoutes: true,
    //             }),
    //             new RouteData({
    //                 icon: <CalenderIcon/>,
    //                 url: matchLanguage + '/events',
    //                 name: hasShownLanguage && dictionaryStore ?
    //                     dictionaryStore.get(shownLanguage, '/events', 'Events') : '',
    //             }),
    //             new RouteData({
    //                 icon: <ShoppingCartBadgeIcon count={entryCount}/>,
    //                 url: matchLanguage + '/entry',
    //                 name: hasShownLanguage && dictionaryStore ?
    //                     dictionaryStore.get(shownLanguage, '/entry', 'SportEntry') : '',
    //             }),
    //             ...extraTopSideBarItems,
    //         ]
    //     },
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [debug, matchLanguage, shownLanguage, dictionaryStore, hasShownLanguage, extraTopSideBarItems, entryCount]
    // );
    //
    // const bottomSideBarItems: Array<RouteData|React.Node> = React.useMemo(
    //     () => {
    //         return [
    //             new RouteData({
    //                 icon: <InfoIcon/>,
    //                 url: matchLanguage + '/about',
    //                 name: hasShownLanguage && dictionaryStore ?
    //                     dictionaryStore.get(shownLanguage, '/about', 'About') : '',
    //             }),
    //         ]
    //     },
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [debug, matchLanguage, shownLanguage, dictionaryStore, hasShownLanguage]
    // );


    // React.useEffect(() => {
    //     if (matchLanguage !== '/' && matchLanguage !== "") {
    //         const [lan, country] = shownLanguage.slice().split('-');
    //         if (lan && country) {
    //             if (lan !== 'en') {
    //                 // $FlowFixMe
    //                 import('moment/locale' + lan).then(() => {
    //                     moment.locale(lan + '-' + country);
    //                 }).catch(() => {
    //                     console.log('Momentjs language definition for ' + lan + '-' + country + ' not found');
    //                 })
    //             } else {
    //                 moment.locale('');
    //             }
    //         } else {
    //             moment.locale('');
    //         }
    //     } else {
    //         //default
    //         moment.locale('en');
    //     }
    // }, [matchLanguage, shownLanguage]);


    // React.useEffect(() => {
    //     if (!scoreDictionaryStore.hasLanguage(shownLanguage)) {
    //         scoreDictionaryStore.loadLanguage(shownLanguage)
    //             .then(()=>{})
    //             .catch(e => console.log(e));
    //     }
    // }, [scoreDictionaryStore, shownLanguage]);


    function setDoLoginCB(newCallBack: ((logged:boolean) => void)|undefined|null) {
        doLoginCBRef.current = newCallBack;
    }
    // function handleDrawerOpen() {
    //     setOpenSide(true);
    //     if (!manualSide) {
    //         setManualSide(true);
    //     }
    // }
    //
    // function handleDrawerClose() {
    //     setOpenSide(false);
    //     if (!manualSide) {
    //         setManualSide(true);
    //     }
    // }
    //
    // function handleToggleDrawer() {
    //     setOpenSide(open => !open);
    //     if (!manualSide) {
    //         setManualSide(true);
    //     }
    // }
    //
    // function handleSelectMenuItem() {
    //     if (isSmallScreen) {
    //         handleDrawerClose();
    //     }
    // }

    function openAccountManagement() {
        navigator(matchLanguage + '/account');
    }
    function openMessageCenter() {
        navigator(matchLanguage + '/messages');
    }

    async function login() {
        const doLoginCB = doLoginCBRef.current;
        if (doLoginCB) {
            doLoginCB(true);
        }
    }
    async function logout() {
        const doLoginCB = doLoginCBRef.current;
        if (doLoginCB) {
            doLoginCB(false);
        }
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'absolute',
    }}>
        <LanguageCtx.Provider value={languageProviderRef.current}>
            <div style={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                height: 'auto'
            }}>
                {<TopBar
                    onOpenDrawer={()=>{}}
                    onRequestLogin={login}
                    onRequestLogout={logout}
                    onOpenAccountManagement={openAccountManagement}
                    onOpenMessageCenter={openMessageCenter}
                    currentLanguage={shownLanguage}
                    loggedIn={!!loginState}
                />}
            </div>
            <div className={'.root'} style={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto',
                overflowY: 'auto',
            }}>
                <Suspense fallback={<div>Loading...</div>}>
                    <MainPlannerContextBase
                        setDoLoginCB={setDoLoginCB}
                        setLoginState={setLoginState}
                        expandTopSideBarElemsCB={setExtraTopSideBarItems}
                    />
                </Suspense>
            </div>
            <CookieBanner/>
        </LanguageCtx.Provider>
    </div>

});
const language_regex = /^[a-z]{2}-[a-za]{2}$/

const LanguageView = observer(function(props: LanguageViewProps) {
    const {defaultLanguage} = props;
    const params = useParams();

    const lang = params.lang;


    if (!lang || !lang.match(language_regex)) {
        return <NoLanguageView defaultLanguage={defaultLanguage}/>
    }
    return <LanguageContent language={lang}/>
});
const NoLanguageView = observer(function(props: LanguageViewProps) {
    const {defaultLanguage} = props;
    const loc = useLocation();
    const t = "/" + defaultLanguage + loc.pathname + loc.search;
    return <Navigate to={t} state={loc.state}/>
});

export const LanguageRouter = observer(function LanguageRouter(props: PropTy) {
    const {defaultLanguage='en-us'} = props;

    return <Routes>
        <Route path={"/:lang/*"}
               element={<LanguageView defaultLanguage={defaultLanguage}/>}
        />
        <Route path="/"
            element={<NoLanguageView defaultLanguage={defaultLanguage}/>}
        />
    </Routes>;
});

