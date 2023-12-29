import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const useSwitchLanguage = () => {
  const router = useRouter();
  const onSwitch = (locale: string) => {
    Cookies.set("NEXT_LOCALE", locale);
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale }
    );
  };
  return onSwitch;
};
