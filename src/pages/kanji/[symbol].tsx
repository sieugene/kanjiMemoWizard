import { KanjiDetails } from "@/entities/kanjiDetails";
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

export default KanjiPage;
