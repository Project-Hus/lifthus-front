import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Img,
  Text,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { routineAct } from "../../../api/mocks/program.mock";
import { ThemeColor } from "../../../common/styles/theme.style";

const TodayActInfo = ({ act, type }: { act: routineAct; type: string }) => {
  let [reps, setReps] = useState(0);
  //time 관련 state
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [timerId, setTimerId] = useState<number>(400);

  useEffect(() => {
    if (start) {
      const intervalId = setInterval(() => {
        setTimerId((prevtime) => prevtime - 1);
      }, 1000); // 1초마다 실행

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [start]);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (start == false) {
      setTimerId(400);
      setStart((prevValue) => !prevValue);
    } else {
      setStart((prevValue) => !prevValue);
    }
  };
  const handleReset = () => {
    setTimerId(400);
    setStart(false);
  };

  //  reps add, minus function
  const addReps = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    maxReps: number
  ) => {
    e.stopPropagation();
    if (reps < maxReps) setReps(reps + 1);
  };
  const minusReps = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (reps > 0) setReps(reps - 1);
  };

  const media = css`
    @media screen and (max-width: 700px) {
      display: none;
    }
  `;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: ThemeColor.basicColor }}>
          <Box as="span" flex="1" textAlign="left">
            <Flex
              direction={"row"}
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Img src="https://bit.ly/sage-adebayo" width="10%" height="10%" />
              <Text fontSize="0.3em">{"Act1.routineName"}</Text>
              {type == "repeat" && (
                <>
                  <Text>{100 + "kg"}</Text>
                  <>
                    <Text css={media}>{"x" + act.reps}</Text>
                    <Text>{reps + "/" + act.reps}</Text>
                  </>

                  <Flex direction={"column"}>
                    <Box onClick={(e) => addReps(e, act.reps)}>
                      <TriangleUpIcon />
                    </Box>
                    <Box onClick={minusReps}>
                      <TriangleDownIcon />
                    </Box>
                  </Flex>
                </>
              )}

              {type == "time" && (
                <>
                  <Flex direction={"column"} fontSize="2vw">
                    <Text>{"remaining"}</Text>
                    <Flex justifyContent={"center"}>
                      <Text>{timerId}</Text>
                      <Text>{"초"}</Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Box
                      padding="0.5em"
                      bg={ThemeColor.basicColor}
                      onClick={handleButtonClick}
                      borderRadius="10px"
                    >
                      <Text>{start ? "stop" : `⏱️`}</Text>
                    </Box>
                    {/* {start && (
                      <Box
                        padding="0.5em"
                        bg={ThemeColor.basicColor}
                        onClick={handleReset}
                        borderRadius="10px"
                      >
                        <Text>{"reset"}</Text>
                      </Box>
                    )} */}
                  </Flex>
                </>
              )}
              <Box fontSize="4vw">🏁</Box>
            </Flex>
          </Box>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>test</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};
export default TodayActInfo;
