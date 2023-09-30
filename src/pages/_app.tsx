import { Providers } from "@/app/providers";
import { MainLayout } from "@/layouts";
import GlobalStyle from "@/styles/global";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MainLayout>
        <GlobalStyle />
        <Component {...pageProps} />
      </MainLayout>
    </Providers>
  );
}

export default appWithTranslation(App);
