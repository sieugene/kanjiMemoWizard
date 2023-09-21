import styled from "styled-components";
import { useKanjiList } from "../../hooks/useKanjiList";
import { sortByLevel } from "../../lib/sortByLevel";
import { KanjiItem } from "../KanjiItem";

export const KanjiList = () => {
  const list = useKanjiList();

  const kanjiByGrades = sortByLevel(list);

  return (
    <div>
      <div>
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
