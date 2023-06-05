import {
  AddIcon,
  PlusSquareIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Img,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ThemeColor } from "../../../common/styles/theme.style";
import { Link, useNavigate } from "react-router-dom";
import RoutineMenu from "../RoutineMenu";
import { programDB } from "../../../store/interfaces/program.interface";
import { set } from "react-hook-form";
import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";
import { routineAct, routineActList } from "../../../api/mocks/program.mock";
import TodayActInfo from "./TodayActInfo";

const TodaysRoutine = () => {
  const todayList: routineAct[] = routineActList;
  const today = new Date().toDateString();

  const [IsRoutineMenu, setIsRoutineMenu] = useState(false);

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  let [reps, setReps] = useState(0);

  const handleTimer = (seconds: number) => {
    if (start) {
      setTime(0);
      setStart(false);
      return;
    }
    setTime(seconds);
    setStart(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (start == false) {
      clearInterval(timer);
    }
    console.log(time);
  }, [start]);

  const navigate = useNavigate();
  const goRoutineMenu = () => {
    // menu 경로로 이동
    navigate("/routine/menu");
  };
  //  reps add, minus function
  const addReps = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    maxReps: number
  ) => {
    e.stopPropagation();
    if (reps < maxReps) setReps(reps + 1);
  };
  const minusReps = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (reps > 0) setReps(reps - 1);
  };

  return (
    <>
      <BasicPageLayout>
        {IsRoutineMenu ? (
          <RoutineMenu />
        ) : (
          <>
            <Flex justifyContent={"space-between"}>
              <Flex>
                <Box marginRight="0.6em" fontWeight={"bold"}>
                  오늘의 루틴{" "}
                </Box>
                <Text marginX={"0.5em"} fontSize={"smaller"}>
                  {today}
                </Text>
              </Flex>
              <Button onClick={goRoutineMenu}>
                <AddIcon />
              </Button>
            </Flex>
            <Accordion defaultIndex={[0]} allowMultiple>
              {todayList.map((act, index) => (
                <TodayActInfo act={act} key={index} type="time" />
              ))}
            </Accordion>
          </>
        )}
      </BasicPageLayout>
    </>
  );
};

export default TodaysRoutine;
