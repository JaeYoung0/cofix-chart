import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { resetStyle } from '@/styles/resetStyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <title>Cofix Chart</title>
        <meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1" />
      </Head>
      <Global styles={resetStyle} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
