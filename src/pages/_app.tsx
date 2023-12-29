import { Providers } from "@/app/providers";
import { MainLayout } from "@/layouts";
import GlobalStyle from "@/styles/global";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Providers>
        <MainLayout>
          <GlobalStyle />
          <Component {...pageProps} />
        </MainLayout>
      </Providers>
    </>
  );
}

export default appWithTranslation(App);
