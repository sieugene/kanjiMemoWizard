import { FC, useMemo } from "react";
import { useKanjiSteps } from "../hooks/useKanjiSteps";
import styled from "styled-components";
import { WriteGrid } from "@/shared/ui";

export const KanjiSteps: FC<{ symbol: string }> = ({ symbol }) => {
  const steps = useKanjiSteps({ symbol });
  const ghost = useMemo(() => {
    if (steps?.length) {
      return steps[steps.length - 1];
    }
  }, [steps]);
  return (
    <Root>
      {ghost &&
        steps?.map((step, index) => (
          <StepBody key={index}>
            <FullPart dangerouslySetInnerHTML={{ __html: ghost }} />
            <Step dangerouslySetInnerHTML={{ __html: step }} />
            <Grid>
              <WriteGrid size={100} />
            </Grid>
          </StepBody>
        ))}
    </Root>
  );
};

const Root = styled.div`
  overflow: scroll;
  display: flex;
`;

const StepBody = styled.div`
  position: relative;
`;

const Step = styled.div`
  position: relative;
  z-index: 1;
  border: 1px solid #b9b6b6;

  &::not(:first-child) {
    border-left: 0;
  }
`;

const FullPart = styled.div`
  position: absolute;
  z-index: 1;
  opacity: 0.2;
`;

const Grid = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  svg {
    line {
      stroke: white;
      opacity: 0.1;
    }
  }
`;
