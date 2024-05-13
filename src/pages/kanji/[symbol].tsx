import { KanjiDetails } from "@/entities/kanjiDetails";
import { findKanjiBySymbol } from "@/features/kanjiList/lib/findKanjiBySymbol";
import { ROUTES } from "@/shared/routes";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type RouteQuery = ParsedUrlQuery & { symbol: string };

const KanjiPage = () => {
  const router = useRouter();
  const params = router?.query as RouteQuery;

  return (
    <div>
      <KanjiDetails symbol={params.symbol} />
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  const query = context.query as { symbol: string };
  const locale = context.locale || "";
  const exist = findKanjiBySymbol(query.symbol);
  if (exist) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else {
    return {
      redirect: {
        destination: ROUTES[404],
        permanent: false,
      },
    };
  }
}) satisfies GetServerSideProps;

export default KanjiPage;
