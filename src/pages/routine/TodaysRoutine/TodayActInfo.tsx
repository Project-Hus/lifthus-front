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
import { useEffect, useState } from "react";
import { routineAct } from "../../../api/mocks/program.mock";
import { ThemeColor } from "../../../common/styles/theme.style";

const TodayActInfo = ({ act, type }: { act: routineAct; type: string }) => {
  let [reps, setReps] = useState(0);
  //time 관련 state
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [timerId, setTimerId] = useState<any>(null);

  const handleTimer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    seconds: number
  ) => {
    if (start) {
      setTime(0);
      setStart(false);

      return;
    }
    setTime(seconds);
    setStart(true);
  };

  useEffect(() => {
    if (timerId) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000); // 1초마다 실행

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timerId]);

  const handleStartButtonClick = () => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000); // 1초마다 실행

    setTimerId(intervalId);
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
                  {" "}
                  <Flex direction={"column"}>
                    <Text>{"remaining"}</Text>
                    <Flex>
                      <Text>{time}</Text>
                      <Text>{"초"}</Text>
                    </Flex>
                  </Flex>
                  <Button onClick={handleStartButtonClick}>⏱️</Button>
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
