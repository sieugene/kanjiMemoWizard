import { useEvent } from "@/shared/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const useSwitchLanguage = () => {
  const router = useRouter();
  return useEvent((locale: string) => {
    Cookies.set("NEXT_LOCALE", locale);
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale }
    );
  });
};
