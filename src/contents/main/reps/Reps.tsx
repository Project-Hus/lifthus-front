import styled from "@emotion/styled";
import React from "react";
import Rep from "./components/Rep";

const Reps = () => {
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
