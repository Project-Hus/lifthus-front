import { TriangleDownIcon } from "@chakra-ui/icons";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { ThemeColor } from "../../../common/styles/theme.style";
import useProgramCreationStore from "../../../store/createProgram.zustand";
import RoutineActBuilder from "./RoutineActBuilder";

const WeeklyProgramBuilder = () => {
  const { dailyRoutines, setType, removeDailyRoutine } =
    useProgramCreationStore();
  dailyRoutines.sort((a, b) => a.day - b.day);
  const [weekCnt, setWeekCnt] = useState(
    dailyRoutines.length > 0
      ? Math.ceil(dailyRoutines[dailyRoutines.length - 1].day / 7)
      : 1
  );
  const weeks = [];
  for (let i = 1; i <= weekCnt; i++) {
    weeks.push(<WeekRoutineBuilder week={i} />);
  }
  return (
    <div>
      {weeks}
      <div>
        <Button
          variant="unstyled"
          color="orange"
          border="0.1rem solid"
          _hover={{ bgColor: ThemeColor.topButtonColor }}
          margin="0.5rem"
          marginLeft="1rem"
          fontWeight="bold"
          fontSize="1.5rem"
          w="40%"
          onClick={() => {
            if (weekCnt === 1) {
              setType("none");
              return;
            }
            dailyRoutines
              .filter((dr) => dr.day > (weekCnt - 1) * 7)
              .map((dr) => removeDailyRoutine(dr.day));
            setWeekCnt(weekCnt - 1);
          }}
        >
          -WEEK
        </Button>
        <Button
          variant="unstyled"
          color="skyblue"
          border="0.1rem solid"
          _hover={{ bgColor: ThemeColor.topButtonColor }}
          margin="0.5rem"
          marginLeft="1rem"
          fontWeight="bold"
          fontSize="1.5rem"
          w="40%"
          onClick={() => {
            setWeekCnt(weekCnt + 1);
          }}
        >
          +WEEK
        </Button>
      </div>
    </div>
  );
};
export default WeeklyProgramBuilder;

type WeekRoutineBuilderProps = {
  week: number;
};

const WeekRoutineBuilder = ({ week }: WeekRoutineBuilderProps) => {
  const { isOpen, getButtonProps, getDisclosureProps } = useDisclosure();
  return (
    <WeekRoutineDiv>
      <Text {...getButtonProps()} textAlign="left" marginLeft="1.5rem">
        {week} 주차 {isOpen ? <TriangleDownIcon /> : <></>}
      </Text>
      <WeekDayRoutinesDiv {...getDisclosureProps()}>
        <WeekDayRoutine text="월요일" week={week} weekDay={1} />
        <WeekDayRoutine text="화요일" week={week} weekDay={2} />
        <WeekDayRoutine text="수요일" week={week} weekDay={3} />
        <WeekDayRoutine text="목요일" week={week} weekDay={4} />
        <WeekDayRoutine text="금요일" week={week} weekDay={5} />
        <WeekDayRoutine text="토요일" week={week} weekDay={6} />
        <WeekDayRoutine text="일요일" week={week} weekDay={7} />
      </WeekDayRoutinesDiv>
    </WeekRoutineDiv>
  );
};

const WeekRoutineDiv = styled.div`
  border-bottom: 0.1rem solid ${ThemeColor.backgroundColorDarker};
`;

const WeekDayRoutinesDiv = styled.div``;

const WeekDayRoutineDiv = styled.div`
  border-top: 0.1rem dashed ${ThemeColor.backgroundColorDarker};
`;

type WeekDayRoutineProps = {
  text: string;
  week: number;
  weekDay: number;
};

const WeekDayRoutine = ({ week, weekDay, text }: WeekDayRoutineProps) => {
  const { dailyRoutines } = useProgramCreationStore();
  const day = (week - 1) * 7 + weekDay;
  const dr = dailyRoutines.find((dr) => dr.day === day);

  const { isOpen, getButtonProps, getDisclosureProps } = useDisclosure();
  return (
    <WeekDayRoutineDiv>
      <Text marginLeft="3rem" textAlign="left" {...getButtonProps()}>
        {text} {isOpen ? <TriangleDownIcon /> : <></>}
      </Text>
      <div {...getDisclosureProps()}>
        <RoutineActBuilder day={day} />
      </div>
    </WeekDayRoutineDiv>
  );
};
