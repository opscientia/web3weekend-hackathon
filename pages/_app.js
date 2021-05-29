import React, { useCallback, useState } from 'react'
import useDomClean from '../lib/use-dom-clean'
import { GeistProvider, CssBaseline, useTheme } from '@geist-ui/react'
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import dynamic from "next/dynamic";
import {generateSignature} from "../lib/signerconnect"

// const getDefaultTheme = () =>
//   window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function MyApp({ Component, pageProps }) {

  const [themeType, setThemeType] = useState('light');
  const [provider, setProvider] = useState(null);

  const toggleDarkMode = () => setThemeType(themeType === 'dark' ? 'light' : 'dark');
  const [injectedProvider, setInjectedProvider] = useState();

  // if (window.matchMedia) {
  //   const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   colorSchemeQuery.onchange = (e) => setThemeType(e.matches ? 'dark' : 'light');
  // }
  const connectUser = async () => {

    console.log('connect')
    const {seed, metamask} = await generateSignature();
    setProvider(metamask)
  }
  
  
  pageProps['connectUser'] = connectUser
  
  return (
    <GeistProvider theme={{ type: themeType }}>
      <CssBaseline />
      <Component {...pageProps} provider={provider} toggleDarkMode={toggleDarkMode} connectUser={connectUser}/>
    </GeistProvider>
  )
}
export default MyApp
