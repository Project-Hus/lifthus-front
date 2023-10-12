import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { ThemeColor } from "../../../common/styles/theme.style";
import useProgramCreationStore from "../../../store/createProgram.zustand";
import ActFinder from "./ActFinder";

type RoutineActBuilderProps = {
  day: number;
};

const RoutineActBuilder = ({ day }: RoutineActBuilderProps) => {
  const { dailyRoutines } = useProgramCreationStore();
  const dr = dailyRoutines.find((dr) => dr.day === day);
  const {
    isOpen: isEditing,
    getButtonProps,
    getDisclosureProps,
  } = useDisclosure();
  return (
    <RoutineActsDiv>
      {!!dr && dr.routineActs.map((ra) => <RoutineAct />)}
      <div {...getDisclosureProps()}>
        <ActFinder />
      </div>
      <Button
        variant="outline"
        border={`0.2rem solid ${ThemeColor.backgroundColorDarker}`}
        margin="0.5rem"
        color="white"
        fontSize="1.5rem"
        w="25%"
        _hover={{ bgColor: ThemeColor.backgroundColorDarker }}
        {...getButtonProps()}
      >
        {isEditing ? <CheckIcon /> : <EditIcon />}
      </Button>
    </RoutineActsDiv>
  );
};
export default RoutineActBuilder;

const RoutineActsDiv = styled.div``;

const RoutineAct = () => {
  return <div>ra</div>;
};
