
import * as React from 'react';
import {GlobalStyles} from "@mui/material";
import { ThemeProvider, createTheme} from '@mui/material/styles';
import {Helmet, HelmetProvider } from "react-helmet-async";
import {CookiesProvider} from "react-cookie";
import {Route, Routes} from 'react-router';
import { BrowserRouter } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Main } from './components/main/Main';
import {observer} from "mobx-react-lite";
import {DictionaryManager} from "./stores/DictionaryManager";
import {AuthStore} from "./stores/AuthStore";
import {FetcherUrl} from "./Fetchers/FetcherUrl";
import {User} from "./models/User";
import { DictionaryManagerCtx } from './stores/DictionaryManagerCtx';
import { AuthStoreCtx } from './stores/AuthStoreCtx';
import { CookieBanner } from './cookie-consent/CookieBanner';

const inputGlobalStyles = <GlobalStyles styles={(theme) => ({
  a: {
    color: theme.palette.primary.main,
  }
})}/>;


function DEBUGFAKELOGIN(authStore: AuthStore, username: string, isroot: boolean = true) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.warn("DEBUG, SHOULD NOT HAPPEN IN PRODUCTION");
    authStore.isRoot = isroot;
    authStore.isSiteAdmin = isroot;
    authStore.userUpdate(User.buildUser({username: username, language: 'en-us', id: '1', verified: true}));
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#ED1C24'
    },
    //secondary: indigo,
    secondary: {
      main: '#8F3B96'
    }
  },
  typography: {
    fontWeightMedium: 600,
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:after': {
            borderBottomColor: '#8F3B96',
          }
        },
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 'normal',
          '@media (min-width:960px)': {
            fontSize: undefined, // MUI default makes fontsize for widescreen *smaller*.
          },
        }
      }
    },
  }
});

const App = observer(function App() {
  const conn = new FetcherUrl();
  const [user, setUser] = React.useState<User|undefined>(undefined);
  const dictionaryManagerRef = React.useRef<DictionaryManager>(new DictionaryManager(conn));
  const authStoreRef = React.useRef<AuthStore>(new AuthStore(conn));

  //DEBUGFAKELOGIN(authStoreRef.current, 'paul', true)

  return (<div style={{height: '100vh', position: 'relative'}}>{<ThemeProvider theme={theme}>
    <HelmetProvider>
      <Helmet>
        <title>Exercise planner</title>
        <meta name="description" content="Exercise planner" />
      </Helmet>
      {inputGlobalStyles}
      <DictionaryManagerCtx.Provider value={dictionaryManagerRef.current}>
        <AuthStoreCtx.Provider value={authStoreRef.current}>
          <CookiesProvider>
            {<BrowserRouter>{
              <Routes>
                <Route path={`*`} element={<>
                  <Main/>
                </>}/>
              </Routes>
            }</BrowserRouter>}
            {<CookieBanner/>}
          </CookiesProvider>
        </AuthStoreCtx.Provider>
      </DictionaryManagerCtx.Provider>
    </HelmetProvider>
  </ThemeProvider>}
  </div>);
});

export default App;
