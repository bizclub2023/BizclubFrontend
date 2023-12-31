import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import "./styles.css";
import { MoralisProvider } from "react-moralis";
import { createTheme } from 'src/theme';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (<MoralisProvider
    serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL }
    appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID }
  > 
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Bizclub
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
     
      <LocalizationProvider dateAdapter={AdapterDateFns}>
       
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <AuthProvider>
  <AuthConsumer>
              {
                (auth) => auth.isLoading
                  ? <SplashScreen />
                  : getLayout(<Component {...pageProps} />)
              }
              </AuthConsumer>
        </AuthProvider>
        

          </ThemeProvider>
      </LocalizationProvider>
      
    </CacheProvider>
              </MoralisProvider>
  );
};

export default App;
