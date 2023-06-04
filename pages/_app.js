import { useContext, useEffect } from 'react';
import { ThemeProvider } from '@/context/theme-context';
import 'app/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
