import styled from "styled-components";
import { useKanjiList } from "../../hooks/useKanjiList";
import { sortByLevel } from "../../lib/sortByLevel";
import { KanjiItem } from "../KanjiItem";
import { Input } from "@nextui-org/react";

export const KanjiList = () => {
  const list = useKanjiList();

  const kanjiByGrades = sortByLevel(list);

  return (
    <div>
      <div>
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
          // startContent={<SearchIcon size={18} />}
          type="search"
        />
        {kanjiByGrades.map((info) => {
          return (
            <div key={info.level}>
              <h3>Level {info.level}</h3>
              <List>
                {info.list.map((item) => (
                  <KanjiItem key={item?.kanji} kanji={item} />
                ))}
              </List>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const List = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
`;
