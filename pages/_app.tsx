import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "../config/themeConfig" 
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState("light");
  
  return <>
  <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
  <GlobalStyles />
  <Component {...pageProps} />
  </ThemeProvider>
  </>
}

export default MyApp
