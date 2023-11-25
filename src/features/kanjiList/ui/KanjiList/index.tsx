import { Kanji } from "@/shared/data";
import { FC, ReactNode } from "react";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import styled, { css } from "styled-components";
import { useGridSizes } from "../../hooks/useGridSizes";
import { useKanjiList } from "../../hooks/useKanjiList";
import { createGridFromArray } from "../../lib/createGridFromArray";
import { sortByLevel } from "../../lib/sortByLevel";
import { KanjiItem } from "../KanjiItem";

const Cell: FC<
  GridChildComponentProps<Kanji[][]> & { children: ReactNode }
> = ({ columnIndex, rowIndex, style, data }) => {
  const kanjiData = data[rowIndex][columnIndex];
  const _id = `${rowIndex}-${columnIndex}-${kanjiData?.kanji}`;
  if (!kanjiData) return null;

  return (
    <div
      key={_id}
      style={{
        ...style,
      }}
    >
      <KanjiItem kanji={kanjiData} />
    </div>
  );
};

export const KanjiList = () => {
  const list = useKanjiList();
  const kanjiByGrades = sortByLevel(list);
  const { listWidth, columnCount, columnWidth } = useGridSizes(160, 6, 2);

  return (
    <Root>
      <Head></Head>
      {kanjiByGrades.map((info) => {
        const dataList = createGridFromArray(info.list, columnCount);
        const rowCount = dataList.length;

        return (
          <Level key={`${info.level}-${columnCount}`}>
            <h3>JLPT N{info.level}</h3>
            <List>
              <FixedSizeGrid
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={500}
                rowCount={rowCount}
                rowHeight={200}
                width={listWidth}
                itemData={dataList}
              >
                {/* difference react version */}
                {Cell as any}
              </FixedSizeGrid>
            </List>
          </Level>
        );
      })}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
