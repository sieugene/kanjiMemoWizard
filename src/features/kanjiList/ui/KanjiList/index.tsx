import { useDebounce } from "@/shared/hooks/useDebounce";
import { Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useKanjiList } from "../../hooks/useKanjiList";
import { sortByLevel } from "../../lib/sortByLevel";
import { KanjiItem } from "../KanjiItem";

export const KanjiList = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce<string>(input, 500);
  const list = useKanjiList();

  const kanjiByGrades = sortByLevel(list);
  const applySearchFilter = useMemo(() => {
    const data = kanjiByGrades.map((a) => ({
      ...a,
      list: a.list.filter((a) => {
        return (
          a.kanji.includes(debouncedInput) ||
          a.meanings?.[0]
            ?.toLocaleLowerCase()
            .includes(debouncedInput?.toLocaleLowerCase())
        );
      }),
    }));
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  return (
    <Root>
      <Head>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          onChange={(e) => setInput(e.target.value)}
        />
      </Head>
      {applySearchFilter.map((info) => {
        return (
          <Level key={info.level}>
            <h3>JLPT N{info.level}</h3>
            <List>
              {info.list.map((item) => (
                <KanjiItem key={item?.kanji} kanji={item} />
              ))}
            </List>
          </Level>
        );
      })}
    </Root>
  );
};

const Root = styled.div``;

const Head = styled.div`
  margin-bottom: 10px;
`;

const List = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  ${({ theme }) => css`
    ${theme.breakpoints.lessThan("lg")} {
      justify-content: center;
    }
  `}
`;

const Level = styled.div`
  margin-bottom: 15px;
  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    ${({ theme }) => css`
      ${theme.breakpoints.lessThan("lg")} {
        text-align: center;
      }
    `}
  }
`;
