import { StarIcon, BellIcon } from "@chakra-ui/icons";
import {
  border,
  Box,
  Button,
  Card,
  Flex,
  Img,
  Input,
  Text,
} from "@chakra-ui/react";
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
import styled from "@emotion/styled";

export const borderStyle = css`
  border-top: 5px solid ${ThemeColor.backgroundColorDarker};
  border-bottom: 5px solid ${ThemeColor.backgroundColorDarker};
`;
//make styled component for bottom border
export const BottomBorder = styled.div`
  border-bottom: 3px solid ${ThemeColor.backgroundColorDarker};
`;

const DetailProgram = () => {
  const CardStyle = css`
    color: white;
    border-radius: 5% 5% 0px 0px;
    box-shadow: 0px 5px 0px 0px ${ThemeColor.backgroundColorDarker};
    min-width: 60vw;
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
    <>
      <BasicPageLayout>
        {/* 프로그램 기몬 정보 창 */}
        <Card bg={ThemeColor.basicColor} marginY="0.5em" css={CardStyle}>
          <div>
            <Flex direction={"row"} margin="0">
              <Flex alignItems={"center"} flexGrow={1}>
                <Text fontSize="3rem" paddingLeft="0.5rem" fontWeight={"bold"}>
                  {program.name}
                </Text>
                &nbsp;
                <Text paddingRight="0.3em" fontSize="0.7rem">
                  {"by"}
                </Text>
                <Text fontSize="1rem" paddingLeft="0.1rem" fontWeight="bold">
                  {program.author}
                </Text>
              </Flex>
            </Flex>

            <Box
              float="right"
              fontSize="1rem"
              marginTop="0em"
              marginBottom={"0.5em"}
              marginRight="0.5em"
            >
              👍
              {program.starnum}
              📌
              {program.likenum}
            </Box>
          </div>
        </Card>
        {/* 프로그램 세부 설명창 */}

        <RoutineShort isDetail={true} result={program} />
        <Flex justifyContent={"end"} alignItems="center">
          <Button
            bg={ThemeColor.backgroundColor}
            fontSize="5vw"
            width="7vw"
            height="7vw"
          >
            👍
          </Button>
          &nbsp;
          <Button
            bg={ThemeColor.backgroundColor}
            fontSize="5vw"
            width="7vw"
            height="7vw"
          >
            📌
          </Button>
        </Flex>

        {/* 프로그램 시작 버튼 */}

        <Flex css={borderStyle}>
          <Button
            flex={1}
            onClick={goProgramStart}
            padding="10%"
            bg={ThemeColor.backgroundColor}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
          >
            <Text fontSize="3em">프로그램 시작</Text>
          </Button>
          <Button
            flex={1}
            padding="10%"
            bg={ThemeColor.backgroundColor}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
          >
            <Text fontSize="3em">변형하기</Text>
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
      </BasicPageLayout>
    </>
  );
};
export default DetailProgram;
