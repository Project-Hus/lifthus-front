import { StarIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Flex, Img, Input, Text } from "@chakra-ui/react";
import RoutineShort from "./RoutineShort";
import { programDB } from "../../store/interfaces/program.interface";
import { ThemeColor } from "../../common/styles/theme.style";
import { css } from "@emotion/react";
import useProgramStore from "../../store/program.zustand";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import UnitRoutine from "./UnitRoutine";
import { useNavigate } from "react-router-dom";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { userRMInfo } from "./StartPrgram";

const DetailProgram = () => {
  const CardStyle = css`
    color: white;
    border-radius : 5% 5% 0px 0px;
    box-shadow  : 0px 5px 0px 0px ${ThemeColor.backgroundColorDarker};}};
    `;
  const ExerciseList = [];

  const { program } = useProgramStore();

  const [isStart, setStart] = useState(true);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const todayDate = new Date().toISOString().split("T")[0];
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  // Date 를 입력받고 7일 후 날짜를 반환하는 함수
  const getEndDate = (startDate: string, week: number) => {
    const start = new Date(startDate);
    const end = new Date(start.setDate(start.getDate() + 7 * week));
    return end.toISOString().slice(0, 10);
  };

  const navigate = useNavigate();
  const goProgramStart = () => {
    navigate("/routine/menu/start");
  };

  return (
    <BasicPageLayout>
      <>
        {/* 프로그램 기몬 정보 창 */}
        <Card
          bg={ThemeColor.basicColor}
          marginY="0.5em"
          css={CardStyle}
          width="100%"
        >
          <div>
            <Flex direction={"row"} margin="0">
              <div>
                <Flex alignItems={"center"}>
                  &nbsp;
                  <Text fontSize="5vw" fontWeight={"bold"}>
                    {program.name}
                  </Text>
                  &nbsp;
                  <Text paddingRight="0.3em" fontSize={"2.5vw"}>{"by"}</Text>
                  <Text fontSize={"2.5vw"} fontWeight="bold">
                    {program.author}
                  </Text>
                </Flex>
              </div>
            </Flex>
            <Box float="right" fontSize="2vw" marginTop="0em" marginBottom={"0.5em"} marginRight="0.5em">
              👍
              {program.starnum}
              &nbsp;
              📌
              {program.likenum}
            </Box>
          </div>
        </Card>
        {/* 프로그램 세부 설명창 */}

        <RoutineShort isDetail={true} result={program} />
        <Flex justifyContent={"end"} alignItems="center">
          <Button bg={ThemeColor.backgroundColor} fontSize="5vw" width="7vw" height="7vw">👍</Button>
          &nbsp;
          <Button bg={ThemeColor.backgroundColor} fontSize="5vw" width="7vw" height="7vw">📌</Button>
        </Flex>

        {/* 프로그램 시작 버튼 */}

        <Flex marginY="0.5em">
          <Button
            flex={1}
            onClick={goProgramStart}
            bg={isStart ? "#9298E2" : ThemeColor.backgroundColor}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
          >
            {"프로그램 시작"}
          </Button>
          <Button
            flex={1}
            bg={ThemeColor.backgroundColor}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}

          >
            변형하기
          </Button>
        </Flex>
        {/* 주차별 루틴 */}
        <UnitRoutine
          isStart={false}
          unitDate={"week"}
          startDate={startDate}
          num={1}
          RMInfo={{} as userRMInfo}
        />
      </>
    </BasicPageLayout>
  );
};
export default DetailProgram;
