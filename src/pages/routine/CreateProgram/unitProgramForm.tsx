import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import SearchExercise from "./SearchExrcise";
import { ThemeColor } from "../../../common/styles/theme.style";
import ExerciseInfo from "./ExcerciseInfo";

import { actDB } from "../../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../../store/program.zustand";
import useNewWeeklyProgramStore, {
  WeeklyRoutine,
} from "../../../store/createWeeklyProgram.zustand";

export const WeekProgramForm = ({
  weeklyRoutine,
}: {
  weeklyRoutine: WeeklyRoutine;
}) => {
  const { newProgram, removeWeeklyRoutine } = useNewWeeklyProgramStore();

  const { getDisclosureProps, getButtonProps, isOpen } = useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  return (
    <>
      <Flex paddingX="1em" justifyContent={"space-between"}>
        <Box flex="2" {...buttonProps}>
          <Flex>
            <Text>{weeklyRoutine.week + "주차"}</Text>
            {isOpen && <TriangleDownIcon />}
          </Flex>
        </Box>
        <Button onClick={() => removeWeeklyRoutine(0)}>
          <DeleteIcon />
        </Button>
      </Flex>
      {[1, 2, 3, 4, 5, 6, 7].map((day, index) => {
        return (
          <>
            {
              <Box key={index} {...disclosureProps}>
                <DayProgramForm week={weeklyRoutine.week} day={day} />
              </Box>
            }
          </>
        );
      })}
    </>
  );
};

const DayProgramForm = ({ week, day }: { week: number; day: number }) => {
  const navigate = useNavigate();
  const goToCreateExcercise = () => {
    navigate("/routine/menu/createexcercise");
  };
  const { setProgramPlanInfo, program } = useProgramPlanStore();

  //for expand and collapse of day program
  const { getDisclosureProps, getButtonProps, isOpen, onClose, onOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  //for expand searchWindow
  const EditProps = useDisclosure();
  const EditbuttonProps = EditProps.getButtonProps();
  //state for day of exercise list
  const [exerciseList, setExerciseList] = useState<actDB[]>([]);
  const EditdisclosureProps = EditProps.getDisclosureProps();

  const dayname: string[] = ["더미", "월", "화", "수", "목", "금", "토", "일"];
  //order 값이 작은 순 정렬
  const dayAct = program.acts.filter(
    (act) => act.week === week && act.dayNum === day
  );
  const sortedayAct = dayAct.sort((a, b) => a.actDB.order - b.actDB.order);

  return (
    <Box paddingLeft="3%">
      <Flex direction="column">
        <Box {...buttonProps}>
          <TriangleDownIcon
            transform={isOpen ? "rotate(0deg)" : "rotate(270deg)"}
          />
          {dayname[day] + "요일"}
        </Box>
        <Card
          {...disclosureProps}
          bg={ThemeColor.backgroundColor}
          color="white"
        >
          {sortedayAct.map((act, idx) => (
            <ExerciseInfo key={idx} act={act} isEditing={EditProps.isOpen} />
          ))}
        </Card>
        <Box {...EditdisclosureProps}>
          <SearchExercise dayNum={day} weekNum={week} />
        </Box>
        {EditProps.isOpen ? (
          <Flex direction={"column"} alignItems="center">
            <span>
              <Button {...EditbuttonProps}>
                <CheckIcon />
              </Button>
            </span>
            <span>
              <Button onClick={goToCreateExcercise}>
                <AddIcon />
                새동작 생성하기
              </Button>
            </span>
          </Flex>
        ) : (
          <Flex justifyContent={"center"}>
            <Button {...EditbuttonProps}>
              <EditIcon />
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default WeekProgramForm;
