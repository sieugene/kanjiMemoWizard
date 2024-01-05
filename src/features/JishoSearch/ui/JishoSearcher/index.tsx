import { KanjiConverter } from "@/entities/KanjiConverter/ui";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Card, Chip, Input, Skeleton } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useJishoSearch } from "../../hooks/useJishoSearch";
import { PhraseCard } from "../PhraseCard";

const SKELETON_ITEMS = Array.from(Array(10).keys());

export const JishoSearcher = () => {
  const { t } = useTranslation();
  const params = useSearchParams();
  const query = useMemo(() => params?.get("text") || "", [params]);
  const [search, setSearch] = useState(query);
  const debouncedInput = useDebounce<string>(search, 500);
  const router = useRouter();

  const { data, isLoading } = useJishoSearch(debouncedInput);

  useEffect(() => {
    const query = new URLSearchParams({ text: debouncedInput });
    router.replace(`?${query.toString()}`);
  }, [debouncedInput]);

  return (
    <div>
      <Chip>{t("Powered by Jisho")}</Chip>
      <Input
        isClearable
        type="text"
        variant="flat"
        label={t("Search")}
        defaultValue={search}
        onChange={({ target }) => {
          setSearch(target.value);
        }}
        onClear={() => setSearch("")}
      />

      <Parsing>
        <KanjiConverter text={search} showFurigana asElement={<h2 />} />
      </Parsing>
      {!search.length ? (
        <h2>{t("Start your search with a phrase in Japanese or English")}</h2>
      ) : (
        <Cards>
          {isLoading
            ? SKELETON_ITEMS.map((_, index) => <CardSkeleton key={index} />)
            : data?.phrase?.map((info, index) => (
                <PhraseCard info={info} key={index} />
              ))}
        </Cards>
      )}
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton
        className="rounded-lg"
        style={{ maxWidth: 300, height: "10rem", marginBottom: "0.5rem" }}
      >
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton
          className="w-3/5 rounded-lg"
          style={{ maxWidth: 220, height: "1.75rem", marginBottom: "0.5rem" }}
        >
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton
          className="w-4/5 rounded-lg"
          style={{ maxWidth: 270, height: "1.55rem", marginBottom: "0.5rem" }}
        >
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton
          className="w-2/5 rounded-lg"
          style={{ maxWidth: 175, height: "1.3rem" }}
        >
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

const Parsing = styled.div`
  margin: 1rem 0rem;
  h2 {
    font-size: 2rem;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
