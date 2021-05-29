import React, {useState} from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import {generateSignature} from "../lib/signerconnect"

function MyApp({ Component, pageProps }) {

  const [provider, setProvider] = useState(null);

  const connectUser = async () => {
    const {seed, metamask} = await generateSignature();
    setProvider(metamask)
  }
  
  pageProps['connectUser'] = connectUser
  
  return (
    <GeistProvider theme={{ type: 'light' }}>
      <CssBaseline />
      <Component {...pageProps} provider={provider} connectUser={connectUser}/>
    </GeistProvider>
  )
}
export default MyApp
