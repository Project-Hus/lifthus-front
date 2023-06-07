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
import { exerciseList } from "../../api/mocks/program.mock";
import { borderStyle, BottomBorder } from "./DetailProgram";
import styled from "@emotion/styled";

export interface userRMInfo {
  actname: string;
  rm: number;
}
const StartProgram = () => {
  const CardStyle = css`
    color: white;
    border-radius: 5% 5% 0px 0px;
    box-shadow: 0px 5px 0px 0px ${ThemeColor.backgroundColorDarker};
  `;

  const ActStyle = styled.div`
  border-bottom : 2px solid ${ThemeColor.backgroundColorDarker} ;
  border-top : 4px solid ${ThemeColor.backgroundColorDarker} ;
`
  const { program } = useProgramStore();
  const ExerciseList = program.acts;

  const [isStart, setStart] = useState(false);
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

  //경로 이동을 위한 useNavigate
  const navigate = useNavigate();
  const goDetailRoutine = () => {
    navigate("/routine/menu/detail");
  };

  //1rm 정보 전달 객체
  const [RMInfo, setRMInfo] = useState<userRMInfo>({} as userRMInfo);

  const handleRMInfo = (e: ChangeEvent<HTMLInputElement>) => {
    RMInfo.rm = Number(e.target.value);
    RMInfo.actname = e.target.id;
    setRMInfo(RMInfo);
  };

  return (
    <BasicPageLayout>
      {/* 프로그램 기몬 정보 창 */}
      <Card
        bg={ThemeColor.basicColor}
        marginY="0.5em"
        css={CardStyle}
        width="100%"
      >
        <div>
          <Flex direction={"row"} margin="0.3em">
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

      <Box>
        <Flex css={borderStyle} >
          <Button
            onClick={goDetailRoutine}
            bg={"#9298E2"}
            padding="10%"
            fontSize="5vw"
            flexGrow={1}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
          >
            {"취소"}
          </Button>
          <Button
            flexGrow={1}
            padding="10%"
            fontSize="5vw"
            bg={ThemeColor.backgroundColor}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
          >
            변형하기
          </Button>
        </Flex>
      </Box>
      {/* 날짜 입력 창 */}
      <Flex>
        <Text fontWeight="bold" >시작일</Text>
        &nbsp;
        <Input
          flex={4}
          defaultValue={todayDate}
          onChange={handleStartDate}
          type="date"
        />
      </Flex>
      {/* 운동 목록 */}
      {/* api완료 되면 exerciseList-> program.acts로 변경함 */}
      <ActStyle>
        {exerciseList.map((exercise, index) => {
          //api완료 되면 dummy->exercise.actDB로 바꿔야 함.
          const dummy = exerciseList;
          return (
            <Flex
              width="100%"
              key={index}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderBottom={`2px solid ${ThemeColor.backgroundColorDarker}`}

            >
              <div>
                <Flex alignItems={"center"}>
                  <Img
                    borderRadius="5%"
                    src={dummy[index].images[0]}
                    boxSize="10vw"
                    marginRight="0.5em"
                  />
                  <Text fontWeight="bold" fontSize="3vw">{dummy[index].name}</Text>
                </Flex>
              </div>
              <span>
                <Flex alignItems={"center"}>
                  <Text fontSize="3vw">1rm:</Text>
                  <Input
                    id={dummy[index].name}
                    min="0"
                    width="5vw"
                    type="number"
                    fontSize="sm"
                    padding="0"
                    onChange={handleRMInfo}
                  />
                  <Text fontSize="3vw">kg</Text>
                </Flex>
              </span>
            </Flex>
          );
        })}</ActStyle>

      {/* 주차별 루틴 */}
      <BottomBorder>
        <UnitRoutine
          isStart={true}
          unitDate={"week"}
          startDate={startDate}
          num={1}
          RMInfo={RMInfo}
        />
      </BottomBorder>
      <Flex>
        <Button flex={1}>Work out!</Button>
      </Flex>
    </BasicPageLayout>
  );
};
export default StartProgram;
