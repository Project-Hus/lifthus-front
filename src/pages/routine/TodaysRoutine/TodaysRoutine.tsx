import { AddIcon, PlusSquareIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ThemeColor } from "../../../common/styles/theme.style";
import { Link, useNavigate } from "react-router-dom";
import RoutineMenu from "../RoutineMenu";
import { routineDB, routineList } from "../../../api/mocks/routineApi.mock";
import { set } from "react-hook-form";

const TodaysRoutine = () => {
  const todayList: routineDB[] = routineList;
  const today = new Date().toDateString();

  const [IsRoutineMenu, setIsRoutineMenu] = useState(false);

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const handleTimer = (seconds: number) => {
    setTime(seconds);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    console.log(time)
    return () => clearInterval(timer);
  }, [time]);



  const navigate = useNavigate();
  const goRoutineMenu = () => {
    // articles 경로로 이동
    navigate('/routine/menu');
  };
  return (

    <>
      {IsRoutineMenu ? <RoutineMenu /> :
        <>
          <Flex justifyContent={"space-between"}>
            <Flex >
              <Box marginRight="0.6em" fontWeight={"bold"}>오늘의 루틴   </Box>
              <Text marginX={"0.5em"} fontSize={"smaller"}>{today}</Text>
            </Flex>
            <Button onClick={goRoutineMenu}><AddIcon /></Button>
          </Flex>
          <Accordion defaultIndex={[0]} allowMultiple>
            {todayList.map((routine, idx) => {
              return (
                <AccordionItem key={idx}>
                  <h2>
                    <AccordionButton _expanded={{ bg: ThemeColor.basicColor }}>
                      <Box as="span" flex='1' textAlign='left'>
                        <Flex direction={"row"} justifyContent={"space-between"}>
                          {routine.images ? <Img src={routine.images[0]} boxSize="2em" /> : null}
                          <Text>{routine.routineName}</Text>
                          <Text>{routine.weight.toString() + "kg"}</Text>
                          <Text>{"x" + routine.sets}</Text>
                          <Flex direction={"column"}>
                            <TriangleUpIcon />
                            <TriangleDownIcon />
                          </Flex>
                          <Button onClick={() => handleTimer(routine.timer ? routine.timer : 0)}>성공여부</Button>
                        </Flex>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  </AccordionPanel>
                </AccordionItem>
              )
            }
            )}
          </Accordion>
        </>
      }
    </>

  )

};

export default TodaysRoutine;
