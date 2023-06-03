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

const TodaysRoutine = () => {
  const todayList: programDB[] = [];
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
              {todayList.map((routine, idx) => {
                return (
                  <AccordionItem key={idx}>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: ThemeColor.basicColor }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          <Flex
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            {routine.images ? (
                              <Img src={routine.images[0]} boxSize="2em" />
                            ) : null}
                            <Text>{"Act1.routineName"}</Text>

                            <Text>{100 + "kg"}</Text>

                            <>
                              <Text>{"x" + 3}</Text>
                              <Text>{3 + "/" + 3}</Text>
                            </>

                            <Flex direction={"column"}>
                              <TriangleUpIcon onClick={() => setReps(reps++)} />
                              <TriangleDownIcon
                                onClick={() => setReps(reps > 0 ? reps-- : 0)}
                              />
                            </Flex>

                            <Flex direction={"column"}>
                              <Text>{"remaining"}</Text>
                              <Text>{time + "초"}</Text>
                            </Flex>
                            <Box>성공여부</Box>
                          </Flex>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}></AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        )}
      </BasicPageLayout>
    </>
  );
};

export default TodaysRoutine;
