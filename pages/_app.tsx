import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  StyledEngineProvider,
  ThemeOptions,
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from 'context/AuthContext';
import { Layout } from 'components';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#6366F1',
    },
    secondary: {
      main: '#F1EE63',
    },
    error: {
      main: '#F163AD',
    },
    success: {
      main: '#63F1A7',
    },
    background: {
      default: '#eef2ff',
    },
  },
};

const theme = createTheme(themeOptions);

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {router.pathname === '/' && <Component {...pageProps} />}
          {router.pathname !== '/' && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </AuthProvider>
  );
}
