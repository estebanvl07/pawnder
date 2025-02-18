import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { HeroUIProvider } from "@heroui/react";

import "~/styles/globals.css";

import { Montserrat } from "next/font/google";
import clsx from "clsx";
import FilesProvider from "~/components/Post/context/FilesContext";
import SearcherProvider from "~/contexts/searcherContext";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  style: "normal",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
        <div className={clsx("-tracking-wide", montserrat.className)}>
          <FilesProvider>
            <SearcherProvider>
              <Component {...pageProps} />
            </SearcherProvider>
          </FilesProvider>
        </div>
      </HeroUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
