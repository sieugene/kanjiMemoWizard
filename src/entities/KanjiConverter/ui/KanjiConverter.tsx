import React, { FC, useMemo } from "react";
import { useFurigana } from "../hooks/useKanjiConverter";
import { Skeleton } from "@nextui-org/react";
import styled from "styled-components";

type Props = {
  text: string;
  showFurigana: boolean;
  asElement: React.ReactNode;
};

export const KanjiConverter: FC<Props> = ({
  showFurigana,
  text,
  asElement,
}) => {
  const { data, isLoading } = useFurigana(text);

  const clonned = useMemo(
    () =>
      React.cloneElement(asElement as any, {
        dangerouslySetInnerHTML: {
          __html: showFurigana ? data?.furigana : text,
        },
      }),
    [asElement, data?.furigana, showFurigana, text]
  );

  return (
    <>
      {isLoading ? (
        <Skeleton style={{ borderRadius: 10 }}>
          <SkeletonItem className="bg-default-200" />
        </Skeleton>
      ) : (
        clonned
      )}
    </>
  );
};

const SkeletonItem = styled.div`
  height: 30px;
  width: 300px;

  display: block;
`;
