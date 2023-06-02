import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, Card, Flex, Input, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { exerciseDB } from "../../api/mocks/routineApi.mock";
import SearchExercise from "./CreateProgram/SearchExrcise";
import { ThemeColor } from "../../common/styles/theme.style";
import ExerciseInfo from "./CreateProgram/ExcerciseInfo";
import { useNavigate } from "react-router-dom";
import { use } from "i18next";
import { week } from "../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../store/program.zustand";

export const WeekProgramForm = ({ week, idx }: { week: week; idx: number }) => {
  const { getDisclosureProps, getButtonProps, isOpen, onClose } =
    useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  const { setWeekInfo, plan } = useProgramPlanStore();
  const targetweek = week;

  return (
    <>
      <Flex paddingX="1em" justifyContent={"space-between"}>
        <Box flex="2" {...buttonProps}>
          <Text>{idx + 1 + "주차"}</Text>
          {isOpen && <TriangleDownIcon />}
        </Box>
        <Button
          onClick={() =>
            setWeekInfo(plan.weeks.filter((week) => week !== targetweek))
          }
        >
          <DeleteIcon />
        </Button>
      </Flex>
      {week.days?.map((day, index) => {
        return (
          <Box key={index} {...disclosureProps}>
            <DayProgramForm weekdays={day.dayname ? day.dayname : ""} />
          </Box>
        );
      })}
    </>
  );
};

const DayProgramForm = ({ weekdays }: { weekdays: string }) => {
  const navigate = useNavigate();
  const goToCreateExcercise = () => {
    navigate("/routine/menu/createexcercise");
  };

  //for expand and collapse of day program
  const { getDisclosureProps, getButtonProps, isOpen, onClose, onOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  //for expand searchWindow
  const EditProps = useDisclosure();
  const EditbuttonProps = EditProps.getButtonProps();
  //state for day of exercise list
  const [exerciseList, setExerciseList] = useState<exerciseDB[]>([]);
  const EditdisclosureProps = EditProps.getDisclosureProps();

  const addExercise = (exercise: exerciseDB) => {
    setExerciseList([...exerciseList, exercise]);
  };

  const deleteExercise = (exercise: exerciseDB) => {
    setExerciseList(exerciseList.filter((item) => item.id !== exercise.id));
  };

  return (
    <Box paddingLeft="3%">
      <Flex direction="column">
        <Box {...buttonProps}>
          <TriangleDownIcon
            transform={isOpen ? "rotate(0deg)" : "rotate(270deg)"}
          />
          {weekdays + "요일"}
        </Box>
        <Card
          {...disclosureProps}
          bg={ThemeColor.backgroundColor}
          color="white"
        >
          {exerciseList.map((exercise, idx) => (
            <ExerciseInfo
              key={idx}
              excercise={exercise}
              deleteExercise={deleteExercise}
              isEditing={EditProps.isOpen}
            />
          ))}
        </Card>
        <Box {...EditdisclosureProps}>
          <SearchExercise addExercise={addExercise} />
        </Box>
        <Button {...EditdisclosureProps}>make new excercise</Button>
        {EditProps.isOpen ? (
          <>
            <Button {...EditbuttonProps}>
              <CheckIcon />
            </Button>
            <Button onClick={goToCreateExcercise}>
              <AddIcon />
              새동작 생성하기
            </Button>
          </>
        ) : (
          <Button {...EditbuttonProps}>
            <EditIcon />
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default WeekProgramForm;
