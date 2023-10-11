import styled from "@emotion/styled";
import React from "react";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import RoutinePanelHead from "../../components/routine/RoutinePanelHead";
import RoutineAbsList from "../../components/routine/RoutineAbsList";

const Routine = () => {
  return (
    <BasicPageLayout>
      <RoutinePanel>
        <RoutinePanelHead date={new Date()} />
        <RoutineAbsList />
      </RoutinePanel>
    </BasicPageLayout>
  );
};

export const RoutinePanel = styled.div`
  border-radius: 0.25em;
  border-top: 0.2rem solid ${ThemeColor.backgroundColorDarker};
  border-bottom: 0.2rem solid ${ThemeColor.backgroundColorDarker};
`;

export default Routine;
