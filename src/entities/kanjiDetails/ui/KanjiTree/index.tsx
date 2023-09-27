import React, { FC } from "react";
import styled from "styled-components";
import { useRadicalsTree } from "../../hooks/useRadicalsTree";
import { KanjiParts } from "@/features/KanjivgAnimate/types";

function tree(kanji: string, deep: number, treeData?: KanjiParts) {
  const nextDeep = deep + 1;
  return treeData?.[kanji]?.map((key, index) => (
    <ul
      key={nextDeep + index}
      className={`depp-${nextDeep} ${deep === 0 ? "tree" : ""}`}
    >
      <li>{key}</li>
      {tree(key, nextDeep, treeData)}
    </ul>
  ));
}

type Props = {
  symbol: string;
};

export const KanjiTree: FC<Props> = ({ symbol }) => {
  const { tree: treeData } = useRadicalsTree(symbol);
  return (
    <Root>
      <div>
        <h2>{symbol}</h2>
        {treeData && tree(symbol, 0, treeData)}
      </div>
    </Root>
  );
};

const Root = styled.div`
  .tree,
  .tree ul {
    margin: 0 0 0 1em; /* indentation */
    padding: 0;
    list-style: none;
    color: white;
    position: relative;
  }

  .tree ul {
    margin-left: 0.5em;
  } /* (indentation/2) */

  .tree:before,
  .tree ul:before {
    content: "";
    display: block;
    width: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-left: 1px solid;
  }

  .tree li {
    margin: 0;
    padding: 0 1.5em; /* indentation + .5em */
    line-height: 2em;
    font-weight: bold;
    position: relative;
  }

  .tree li:before {
    content: "";
    display: block;
    width: 10px; /* same with indentation */
    height: 0;
    border-top: 1px solid;
    margin-top: -1px; /* border top width */
    position: absolute;
    top: 1em; /* (line-height/2) */
    left: 0;
  }

  .tree li:last-child:before {
    // TODO take from ui
    background: #18181b; /* same with body background */
    height: auto;
    top: 1em; /* (line-height/2) */
    bottom: 0;
  }
`;
