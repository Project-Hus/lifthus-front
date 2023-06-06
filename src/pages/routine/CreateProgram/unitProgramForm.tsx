import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, Card, Flex, Input, Text, useMediaQuery } from "@chakra-ui/react";
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
import { css } from "@emotion/react";
import { BottomBorder } from "../DetailProgram";
import { DayActStyle } from "../DayRoutine";

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
      <BottomBorder>

        <Flex paddingX="1em" justifyContent={"space-between"}>
          <Box flex="2" {...buttonProps}>
            <Flex alignItems={"center"}>
              <Text fontWeight={"bold"} fontSize={"3vw"}>{idx + " 주차"}</Text>
              &nbsp;
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
      </BottomBorder>

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

  const [isSmallerScreen] = useMediaQuery("(max-width: 700px)");

  const editButtonStyle = css`
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: ${ThemeColor.backgroundColor};
      border: 2px solid ${ThemeColor.backgroundColorDarker};
      & :hover {
        background - color: ${ThemeColor.backgroundColorDarker};
  }

      `
  return (
    <Box marginLeft="1.5em" fontSize="3vw">

      <Flex direction="column">
        <DayActStyle>
          <Flex {...buttonProps} alignItems="center">
            {dayname[dayNum] + "요일"}
            <TriangleDownIcon
              transform={isOpen ? "rotate(0deg)" : "rotate(270deg)"}
            />
          </Flex>
        </DayActStyle>

        <Card
          {...disclosureProps}
          bg={ThemeColor.backgroundColor}
          color="white"
        >
          {sortedayAct.map((act, idx) => (
            <DayActStyle>
              <ExerciseInfo key={idx} act={act} isEditing={EditProps.isOpen} />
            </DayActStyle>
          ))}
        </Card>
        {EditProps.isOpen && isOpen && (<Box >
          <SearchExercise dayNum={dayNum} weekNum={weekNum} />
        </Box>)}
        {EditProps.isOpen && isOpen && (
          <Flex direction={"column"} alignItems="center" borderBottom={`1px solid ${ThemeColor.backgroundColorDarker}`}>
            <span>
              <Button onClick={goToCreateExcercise} bg={ThemeColor.backgroundColor} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>
                ✏️새동작 생성하기
              </Button>
            </span>
            <span>
              <Box width={isSmallerScreen ? "40px" : "30px"} height={isSmallerScreen ? "40px" : "30px"}  >
                <Button {...EditbuttonProps} css={editButtonStyle} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>
                  <Text fontSize={isSmallerScreen ? "15px" : "15px"} fontWeight="bold">✓</Text>
                </Button>
              </Box>
            </span>

          </Flex>
        )}

        {/* 요일이 열리고 편집상태 아닐 때 나오는 편집버튼 */}
        {!EditProps.isOpen && isOpen && (
          <Flex justifyContent={"center"}  >
            <Box width={isSmallerScreen ? "40px" : "30px"} height={isSmallerScreen ? "40px" : "30px"} >
              <Button {...EditbuttonProps} css={editButtonStyle} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>
                <Text fontSize={isSmallerScreen ? "15px" : "15px"}>🖋️</Text>
              </Button>
            </Box>
          </Flex>
        )}

      </Flex>
    </Box >
  );
};

export default WeekProgramForm;
