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
import SearchExercise from "./SearchExrcise";
import { ThemeColor } from "../../../common/styles/theme.style";
import ExerciseInfo from "./ExcerciseInfo";
import { useNavigate } from "react-router-dom";
import { use } from "i18next";
import { actDB, week } from "../../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../../store/program.zustand";
import { useFormContext } from "react-hook-form";

export const WeekProgramForm = ({
  week: weekId,
  idx,
}: {
  week: number;
  idx: number;
}) => {
  const { getDisclosureProps, getButtonProps, isOpen, onClose } =
    useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  const { setProgramPlanInfo, program } = useProgramPlanStore();

  const { register } = useFormContext();

  const deleteWeek = () => {
    const changedweek = program.weeks.filter((week) => week.weeknum !== weekId);
    const changedday = program.days.filter((day) => day.week !== weekId);
    const changedact = program.acts.filter((act) => act.week !== weekId);
    setProgramPlanInfo({
      weeks: changedweek,
      days: changedday,
      acts: changedact,
    });
  };

  useEffect(() => {
    console.log("daus", program.days);
  }, []);
  return (
    <>
      <Flex paddingX="1em" justifyContent={"space-between"}>
        <Box flex="2" {...buttonProps}>
          <Flex>
            <Text>{idx + "주차"}</Text>
            {isOpen && <TriangleDownIcon />}
          </Flex>
        </Box>
        <Button onClick={() => deleteWeek()}>
          <DeleteIcon />
        </Button>
      </Flex>
      {program.days.map((day, index) => {
        return (
          <>
            {day.week === weekId && (
              <Box key={index} {...disclosureProps}>
                <DayProgramForm weekNum={weekId} dayNum={day.dayNum} />
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

  const dayname: string[] = ["더미", "월", "화", "수", "목", "금", "토", "일"];
  //order 값이 작은 순 정렬
  const dayAct = program.acts.filter(
    (act) => act.week === weekNum && act.dayNum === dayNum
  );
  const sortedayAct = dayAct.sort((a, b) => a.actDB.order - b.actDB.order);

  return (
    <Box paddingLeft="3%">
      <Flex direction="column">
        <Box {...buttonProps}>
          <TriangleDownIcon
            transform={isOpen ? "rotate(0deg)" : "rotate(270deg)"}
          />
          {dayname[dayNum] + "요일"}
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
          <SearchExercise dayNum={dayNum} weekNum={weekNum} />
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
