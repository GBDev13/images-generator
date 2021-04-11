import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app'

import '../styles/global.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App;
