import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import SearchExercise from "./SearchExrcise";
import { ThemeColor } from "../../../common/styles/theme.style";
import ExerciseInfo from "./ExcerciseInfo";

import useNewWeeklyProgramStore, {
  WeeklyRoutine,
} from "../../../store/createWeeklyProgram.zustand";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { use } from "i18next";
import { actDB, week } from "../../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../../store/program.zustand";
import { useFormContext } from "react-hook-form";
import { css } from "@emotion/react";
import { BottomBorder } from "../DetailProgram";
import { DayActStyle } from "../DayRoutine";

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
      <BottomBorder>
        <Flex
          paddingLeft="1em"
          justifyContent={"space-between"}
          _hover={{
            bgColor: ThemeColor.backgroundColorDarker,
            cursor: "pointer",
          }}
        >
          <Box flex="2" {...buttonProps}>
            <Flex
              alignItems={"center"}
              borderBottom={isOpen ? `2px solid` : ``}
            >
              <Text fontWeight={"bold"} fontSize={"1em"} margin="0.2em">
                {weeklyRoutine.week + "주차"}
              </Text>
              &nbsp;
              {isOpen && <TriangleDownIcon />}
            </Flex>
          </Box>
          {weeklyRoutine.week === newProgram.weekly_routines.length && (
            <Button
              size="1em"
              width="2em"
              variant="ghost"
              _hover={{ bgColor: ThemeColor.backgroundColorDarker }}
              onClick={() => removeWeeklyRoutine(0)}
            >
              <DeleteIcon fontSize="0.9em" color={"white"} />
            </Button>
          )}
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
      </BottomBorder>
    </>
  );
};

const editButtonStyle = css`
width: 3.5em;
height: 3.5em;
border-radius: 50%;
background-color: ${ThemeColor.backgroundColor};
border: 2px solid ${ThemeColor.backgroundColorDarker};
& :hover {
  background - color: ${ThemeColor.backgroundColorDarker};
}
`;

const DayProgramForm = ({ week, day }: { week: number; day: number }) => {
  const navigate = useNavigate();
  const goToCreateExcercise = () => {
    navigate("/routine/menu/createexcercise");
  };
  const { newProgram } = useNewWeeklyProgramStore();

  //for expand and collapse of day program
  const { getDisclosureProps, getButtonProps, isOpen, onClose, onOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  //for expand searchWindow
  const EditProps = useDisclosure();
  const EditbuttonProps = EditProps.getButtonProps();
  const EditdisclosureProps = EditProps.getDisclosureProps();

  const dayname: string[] = ["더미", "월", "화", "수", "목", "금", "토", "일"];
  //order 값이 작은 순 정렬
  const routineActs = newProgram.routine_acts.filter(
    (act) => act.week === week && act.day === day
  );
  routineActs.sort((a, b) => a.order - b.order);

  const [isSmallerScreen] = useMediaQuery("(max-width: 700px)");

  return (
    <Box marginLeft="1.5em" fontSize="0.8em">
      <Flex direction="column">
        <DayActStyle>
          <Flex
            {...buttonProps}
            alignItems="center"
            bg={routineActs.length > 0 ? ThemeColor.linkColor : ""}
          >
            {dayname[day] + "요일"}
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
          {routineActs.map((ra, idx) => (
            <DayActStyle>
              <ExerciseInfo
                key={idx}
                routineAct={ra}
                isEditing={EditProps.isOpen}
              />
            </DayActStyle>
          ))}
        </Card>
        {EditProps.isOpen && isOpen && (
          <Box>
            <SearchExercise week={week} day={day} />
          </Box>
        )}
        {EditProps.isOpen && (
          <Flex
            direction={"column"}
            alignItems="center"
            borderBottom={`1px solid ${ThemeColor.backgroundColorDarker}`}
          >
            <Button
              width="100%"
              height="5vw"
              onClick={goToCreateExcercise}
              bg={ThemeColor.backgroundColor}
              _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
              padding="1.2em"
              borderBottom={`1px solid ${ThemeColor.backgroundColorDarker}`}
            >
              <Text fontSize={"1.5em"}>✏️새 동작 생성하기</Text>
            </Button>
            <Button
              {...EditbuttonProps}
              css={editButtonStyle}
              _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
              margin="0.5em"
            >
              <Text
                fontSize={isSmallerScreen ? "15px" : "15px"}
                fontWeight="bold"
              >
                <CheckIcon fontSize={"2em"} />
              </Text>
            </Button>
          </Flex>
        )}

        {/* 요일이 열리고 편집상태 아닐 때 나오는 편집버튼 */}
        {!EditProps.isOpen && isOpen && (
          <Flex justifyContent={"center"}>
            <Button
              margin={"0.2em"}
              {...EditbuttonProps}
              css={editButtonStyle}
              _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
            >
              <EditIcon fontSize={"2em"} />
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default WeekProgramForm;
