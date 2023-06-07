import {
  AddIcon,
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
  const { removeWeeklyRoutine } = useNewWeeklyProgramStore();

  const { getDisclosureProps, getButtonProps, isOpen } = useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  return (
    <>
      <BottomBorder>
        <Flex paddingX="1em" justifyContent={"space-between"}>
          <Box flex="2" {...buttonProps}>
            <Flex alignItems={"center"}>
              <Text fontWeight={"bold"} fontSize={"3vw"}>
                {weeklyRoutine.week + "주차"}
              </Text>
              &nbsp;
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
      </BottomBorder>
    </>
  );
};

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

  const editButtonStyle = css`
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: ${ThemeColor.backgroundColor};
      border: 2px solid ${ThemeColor.backgroundColorDarker};
      & :hover {
        background - color: ${ThemeColor.backgroundColorDarker};
  }

      `;
  return (
    <Box marginLeft="1.5em" fontSize="3vw">
      <Flex direction="column">
        <DayActStyle>
          <Flex {...buttonProps} alignItems="center">
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
            <span>
              <Button
                onClick={goToCreateExcercise}
                bg={ThemeColor.backgroundColor}
                _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
              >
                ✏️새동작 생성하기
              </Button>
            </span>
            <span>
              <Box
                width={isSmallerScreen ? "40px" : "30px"}
                height={isSmallerScreen ? "40px" : "30px"}
              >
                <Button
                  {...EditbuttonProps}
                  css={editButtonStyle}
                  _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
                >
                  <Text
                    fontSize={isSmallerScreen ? "15px" : "15px"}
                    fontWeight="bold"
                  >
                    ✓
                  </Text>
                </Button>
              </Box>
            </span>
          </Flex>
        )}

        {/* 요일이 열리고 편집상태 아닐 때 나오는 편집버튼 */}
        {!EditProps.isOpen && isOpen && (
          <Flex justifyContent={"center"}>
            <Box
              width={isSmallerScreen ? "40px" : "30px"}
              height={isSmallerScreen ? "40px" : "30px"}
            >
              <Button
                {...EditbuttonProps}
                css={editButtonStyle}
                _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
              >
                <Text fontSize={isSmallerScreen ? "15px" : "15px"}>🖋️</Text>
              </Button>
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default WeekProgramForm;
