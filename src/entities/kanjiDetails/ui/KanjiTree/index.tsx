import React, { FC } from "react";
import styled from "styled-components";
import { useRadicalsTree } from "../../hooks/useRadicalsTree";
import { KanjiParts } from "@/features/KanjivgAnimate/types";

const StyledContainer = styled.li<{ deep?: number }>`
  position: relative;
  padding: 10px;
  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -15px;
    display: block;
    width: 0;
    border-left: 1px solid #777;
    content: "";
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const StyledKanji = styled.span`
  display: inline-block;
  background: #fff;
  cursor: pointer;
  color: black;
`;

const StyledCheckbox = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
`;

const StyledLabel = styled.label`
  cursor: pointer;
  position: relative;
  display: inline-block;
  background: #fff;
  color: black;

  &:before {
    background: #000;
    color: #fff;
    position: relative;
    z-index: 1;
    float: left;
    margin: 0 1em 0 -2em;
    width: 1em;
    height: 1em;
    border-radius: 1em;
    content: "+";
    text-align: center;
    line-height: 0.9em;
  }

  ${StyledCheckbox}:checked ~ &::before {
    content: "–";
  }

  &:after {
    border-radius: 0 0.3em 0 0;
    border-top: 1px solid #777;
    border-right: 1px solid #777;
    border-bottom: 0;
    border-left: 0;
    bottom: 0;
    top: 0.5em;
    height: auto;
  }
`;

function tree(kanji: string, deep: number, treeData?: KanjiParts) {
  const nextDeep = deep + 1;
  return treeData?.[kanji]?.map((key, index) => (
    <StyledContainer
      key={nextDeep + index}
      deep={nextDeep}
      className={`depp-${nextDeep}`}
    >
      <StyledCheckbox
        type="checkbox"
        id={`c${nextDeep + index}`}
        defaultChecked
      />
      <StyledLabel
        htmlFor={`c${nextDeep + index}`}
        className={`tree_label depp-${nextDeep}`}
      >
        {key}
      </StyledLabel>
      {tree(key, nextDeep, treeData)}
    </StyledContainer>
  ));
}

type Props = {
  symbol: string;
};
export const KanjiTree: FC<Props> = ({ symbol }) => {
  const { tree: treeData } = useRadicalsTree(symbol);
  return (
    <Root>
      <Head>
        <h2>{symbol}</h2>
      </Head>
      <Tree>
        <ul>
          <StyledContainer className="tree_label">
            <StyledKanji>{symbol}</StyledKanji>
          </StyledContainer>
          {treeData && tree(symbol, 0, treeData)}
        </ul>
      </Tree>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const Head = styled.div`
  width: 100%;
  text-align: center;
  h2 {
    font-size: 2rem;
  }
`;

const Tree = styled.div`
  margin: 1em;
  background-color: #fff;
  border: 1px solid #777;
  border-radius: 0.3em;
  padding: 30px;
`;
