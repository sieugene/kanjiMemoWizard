import { Inter } from "next/font/google";

import { KanjiList } from "@/features/kanjiList";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <KanjiList />
    </main>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
