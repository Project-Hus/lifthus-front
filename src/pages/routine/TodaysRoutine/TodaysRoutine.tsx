import { AddIcon, PlusSquareIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ThemeColor } from "../../../common/styles/theme.style";
import { Link, useNavigate } from "react-router-dom";
import RoutineMenu from "../RoutineMenu";

const TodaysRoutine = () => {
  const todayList: any[] = [3, 3, 3]
  const today = new Date().toDateString();

  const [IsRoutineMenu, setIsRoutineMenu] = useState(false);
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
                          <Img src="https://bit.ly/sage-adebayo" boxSize="2em" borderRadius="full" />
                          <Text>운동종류</Text>
                          <Text>중량</Text>
                          <Text>횟수</Text>
                          <Flex direction={"column"}>
                            <TriangleUpIcon />
                            <TriangleDownIcon />
                          </Flex>
                          <Text>성공여부</Text>
                        </Flex>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {routine}
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
