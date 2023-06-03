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
import SearchExercise from "./CreateProgram/SearchExrcise";
import { ThemeColor } from "../../common/styles/theme.style";
import ExerciseInfo from "./CreateProgram/ExcerciseInfo";
import { useNavigate } from "react-router-dom";
import { use } from "i18next";
import { actDB, week } from "../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../store/program.zustand";

export const WeekProgramForm = ({ idx }: { idx: number }) => {
  const { getDisclosureProps, getButtonProps, isOpen, onClose } =
    useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  const { setProgramPlanInfo, program } = useProgramPlanStore();

  return (
    <>
      <Flex paddingX="1em" justifyContent={"space-between"}>
        <Box flex="2" {...buttonProps}>
          <Text>{idx + 1 + "주차"}</Text>
          {isOpen && <TriangleDownIcon />}
        </Box>
        <Button onClick={() => {}}>
          <DeleteIcon />
        </Button>
      </Flex>
      {program.days.map((day, index) => {
        return (
          <>
            {day.week === idx && (
              <Box key={index} {...disclosureProps}>
                <DayProgramForm weekNum={idx} dayNum={day.dayNum} />
              </Box>
            )}
          </>
        );
      })}
    </>
  );
};

const DayProgramForm = ({
  weekNum,
  dayNum,
}: {
  weekNum: number;
  dayNum: number;
}) => {
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

  return (
    <Box paddingLeft="3%">
      <Flex direction="column">
        <Box {...buttonProps}>
          <TriangleDownIcon
            transform={isOpen ? "rotate(0deg)" : "rotate(270deg)"}
          />
          {dayNum + "요일"}
        </Box>
        <Card
          {...disclosureProps}
          bg={ThemeColor.backgroundColor}
          color="white"
        >
          {program.acts.map((act, idx) => (
            <ExerciseInfo
              key={idx}
              act={act.actDB}
              isEditing={EditProps.isOpen}
            />
          ))}
        </Card>
        <Box {...EditdisclosureProps}>
          <SearchExercise dayNum={dayNum} weekNum={weekNum} />
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
