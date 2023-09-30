
import { KanjiList } from "@/features/kanjiList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return <KanjiList />;
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
