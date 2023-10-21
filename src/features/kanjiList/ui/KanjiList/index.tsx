import styled, { css } from "styled-components";
import { useKanjiList } from "../../hooks/useKanjiList";
import { sortByLevel } from "../../lib/sortByLevel";
import { KanjiItem } from "../KanjiItem";

export const KanjiList = () => {
  const list = useKanjiList();

  const kanjiByGrades = sortByLevel(list);

  return (
    <Root>
      <Head></Head>
      {kanjiByGrades.map((info) => {
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
