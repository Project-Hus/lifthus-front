import styled from "@emotion/styled";
import React from "react";
import { RepContent } from "../../../api/interfacaes/repsApi.interface";
import Rep from "./components/Rep";

const Reps = ({ reps }: { reps: RepContent[] }) => {
  const rep_list = [];
  for (const rep of reps) {
    rep_list.push(<Rep rep={rep}></Rep>);
  }
  return <RepsBoard>{rep_list}</RepsBoard>;
};

const RepsBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Reps;
