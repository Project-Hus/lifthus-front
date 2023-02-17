import styled from "@emotion/styled";
import React from "react";
import { RepContent } from "../../../api/interfacaes/repsApi.interface";
import Rep from "./components/Rep";

const Reps = ({ reps }: { reps: RepContent[] }) => {
  return (
    <RepsBoard>
      <Rep />
    </RepsBoard>
  );
};

const RepsBoard = styled.div`
  display: flex;
  justify-content: center;
`;

export default Reps;
