import {
  CheckIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import actApi from "../../../api/actApi";
import { ThemeColor } from "../../../common/styles/theme.style";
import useProgramCreationStore, {
  CreateRoutineActState,
} from "../../../store/createProgram.zustand";
import ActFinder from "./ActFinder";

type RoutineActBuilderProps = {
  day: number;
};

const RoutineActBuilder = ({ day }: RoutineActBuilderProps) => {
  const { routines } = useProgramCreationStore();
  const dr = routines.find((dr) => dr.day === day);
  const {
    isOpen: isEditing,
    getButtonProps,
    getDisclosureProps,
  } = useDisclosure();
  return (
    <RoutineActsDiv>
      {!!dr &&
        dr.routineActs.map((ra, idx) => (
          <RoutineAct key={idx} routineAct={ra} />
        ))}
      <div {...getDisclosureProps()}>
        <ActFinder day={day} />
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

type RoutineActProps = {
  routineAct: CreateRoutineActState;
};

const RoutineAct = ({ routineAct: ra }: RoutineActProps) => {
  const { data: act } = useQuery(["act", { actCode: ra.actCode }], async () => {
    return await actApi.queryActByCode(ra.actCode);
  });
  if (!act) return <Spinner />;

  const {} = useProgramCreationStore();

  const imgSrc =
    act.imageSrcs.length > 0
      ? act.imageSrcs[0]
      : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  return (
    <RoutineActDiv>
      <Image w="3.5rem" marginTop="0.1rem" marginBottom="0.1rem" src={imgSrc} />
      &nbsp;
      <Text
        padding="0.2rem"
        marginTop="auto"
        marginBottom="auto"
        bgColor={ThemeColor.backgroundColorDarker}
        borderRadius="1rem"
        fontSize={"1rem"}
      >
        {act.actType}
      </Text>
      &nbsp;
      <Text
        marginTop="auto"
        marginBottom="auto"
        textAlign={"left"}
        w="10rem"
        fontSize="1.25rem"
      >
        {act.name}
      </Text>
      {act.actType === "weight" && <WeightTypeRoutineAct />}
      {act.actType === "time" && <TimeTypeRoutineAct />}
      {act.actType === "simple" && <SimpleTypeRoutineAct />}
      <Button
        marginLeft="0.5rem"
        bgColor={ThemeColor.backgroundColorDarker}
        color={ThemeColor.basicColor}
        fontSize="xl"
        onClick={() => {}}
      >
        <TriangleUpIcon />
      </Button>
      <Button
        marginLeft="0.5rem"
        bgColor={ThemeColor.backgroundColorDarker}
        color={ThemeColor.basicColor}
        fontSize="xl"
        onClick={() => {}}
      >
        <TriangleDownIcon />
      </Button>
    </RoutineActDiv>
  );
};

const RoutineActDiv = styled.div`
  display: flex;
`;

const WeightTypeRoutineAct = () => {
  return (
    <Flex marginLeft="auto">
      <Input
        w="5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
      />
      <Text marginTop="auto" marginBottom="auto">
        %
      </Text>
      &nbsp;&nbsp;
      <Text marginTop="auto" marginBottom="auto">
        x
      </Text>
      <Input
        w="5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
      />
    </Flex>
  );
};

const TimeTypeRoutineAct = () => {
  return (
    <Flex marginLeft="auto">
      <Input
        w="5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
      />
      <Text marginTop="auto" marginBottom="auto">
        m
      </Text>
      &nbsp;&nbsp;
      <Input
        w="5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
      />
      <Text marginTop="auto" marginBottom="auto">
        secs
      </Text>
    </Flex>
  );
};

const SimpleTypeRoutineAct = () => {
  return (
    <Flex marginLeft="auto">
      <Input
        w="5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
      />
      <Text marginTop="auto" marginBottom="auto">
        %
      </Text>
      &nbsp;&nbsp;
      <Text marginTop="auto" marginBottom="auto">
        x
      </Text>
      <Input
        w="5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
      />
    </Flex>
  );
};
