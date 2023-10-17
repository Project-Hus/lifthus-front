import {
  CheckIcon,
  DeleteIcon,
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
import { useForm } from "react-hook-form";
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
          <RoutineAct
            key={idx}
            day={day}
            order={idx + 1}
            routineAct={ra}
            isEditing={isEditing}
          />
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
  day: number;
  order: number;
  routineAct: CreateRoutineActState;
  isEditing: boolean;
};

const RoutineAct = ({
  day,
  order,
  routineAct: ra,
  isEditing,
}: RoutineActProps) => {
  const { data: act } = useQuery(["act", { actCode: ra.actCode }], async () => {
    return await actApi.queryActByCode(ra.actCode);
  });

  const { moveRoutineActForward, moveRoutineActBackward, removeRoutineAct } =
    useProgramCreationStore();

  if (!act) return <Spinner />;
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
      {isEditing && (
        <Button
          marginLeft="auto"
          marginTop="auto"
          marginBottom="auto"
          w="5rem"
          bgColor="orange"
          onClick={() => {
            removeRoutineAct(day, order);
          }}
        >
          <DeleteIcon />
        </Button>
      )}
      {!isEditing && act.actType === "weight" && (
        <WeightTypeRoutineAct day={day} order={order} />
      )}
      {!isEditing && act.actType === "time" && (
        <TimeTypeRoutineAct day={day} order={order} />
      )}
      {!isEditing && act.actType === "simple" && (
        <SimpleTypeRoutineAct day={day} order={order} />
      )}
      {!isEditing && (
        <>
          <Button
            marginTop="auto"
            marginBottom="auto"
            marginLeft="0.5rem"
            bgColor={ThemeColor.backgroundColorDarker}
            color={ThemeColor.basicColor}
            fontSize="xl"
            onClick={() => {
              moveRoutineActForward(day, order);
            }}
          >
            <TriangleUpIcon />
          </Button>
          <Button
            marginTop="auto"
            marginBottom="auto"
            marginLeft="0.5rem"
            bgColor={ThemeColor.backgroundColorDarker}
            color={ThemeColor.basicColor}
            fontSize="xl"
            onClick={() => {
              moveRoutineActBackward(day, order);
            }}
          >
            <TriangleDownIcon />
          </Button>
        </>
      )}
    </RoutineActDiv>
  );
};

const RoutineActDiv = styled.div`
  display: flex;
`;

const WeightTypeRoutineAct = ({
  day,
  order,
}: {
  day: number;
  order: number;
}) => {
  const { register, watch } = useForm();
  const { setRatio, setReps, routines } = useProgramCreationStore();
  const dr = routines.find((dr) => dr.day === day);
  const ra = dr?.routineActs[order - 1];
  return (
    <Flex marginLeft="auto">
      <Input
        defaultValue={ra?.ratioOrSecs}
        textAlign="right"
        padding="0.25rem"
        w="3.5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
        {...register("ratio", {
          onChange: () => {
            setRatio(day, order, Number(watch("ratio")));
          },
        })}
      />
      <Text marginTop="auto" marginBottom="auto">
        %
      </Text>
      &nbsp;&nbsp;
      <Text marginTop="auto" marginBottom="auto">
        x
      </Text>
      <Input
        defaultValue={ra?.repsOrMeters}
        textAlign="right"
        padding="0.25rem"
        w="3.5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
        {...register("reps", {
          onChange: () => {
            setReps(day, order, Number(watch("reps")));
          },
        })}
      />
    </Flex>
  );
};

const TimeTypeRoutineAct = ({ day, order }: { day: number; order: number }) => {
  const { register, watch } = useForm();
  const { setMeters, setSecs, routines } = useProgramCreationStore();
  const dr = routines.find((dr) => dr.day === day);
  const ra = dr?.routineActs[order - 1];
  return (
    <Flex marginLeft="auto">
      <Input
        defaultValue={ra?.repsOrMeters}
        textAlign="right"
        padding="0.25rem"
        w="3.5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
        {...register("meters", {
          onChange: () => {
            setMeters(day, order, Number(watch("meters")));
          },
        })}
      />
      <Text marginTop="auto" marginBottom="auto">
        m
      </Text>
      &nbsp;&nbsp;
      <Input
        defaultValue={ra?.ratioOrSecs}
        textAlign="right"
        padding="0.25rem"
        w="3.5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
        {...register("secs", {
          onChange: () => {
            setSecs(day, order, Number(watch("secs")));
          },
        })}
      />
      <Text marginTop="auto" marginBottom="auto">
        s
      </Text>
    </Flex>
  );
};

const SimpleTypeRoutineAct = ({
  day,
  order,
}: {
  day: number;
  order: number;
}) => {
  const { register, watch } = useForm();
  const { setReps, routines } = useProgramCreationStore();
  const dr = routines.find((dr) => dr.day === day);
  const ra = dr?.routineActs[order - 1];
  return (
    <Flex marginLeft="auto">
      <Text marginTop="auto" marginBottom="auto">
        x
      </Text>
      <Input
        defaultValue={ra?.repsOrMeters}
        textAlign="right"
        padding="0.25rem"
        w="3.5rem"
        type="number"
        marginTop="auto"
        marginBottom="auto"
        border="none"
        bgColor={ThemeColor.backgroundColorDarker}
        {...register("reps", {
          onChange: () => {
            setReps(day, order, Number(watch("reps")));
          },
        })}
      />
    </Flex>
  );
};
