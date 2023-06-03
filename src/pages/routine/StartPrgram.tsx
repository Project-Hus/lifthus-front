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
              <Flex>
                <Text fontSize="ms" fontWeight={"bold"}>
                  {program.name}
                </Text>
                <Text fontSize="ms" paddingLeft="0.5em">
                  {"by" + program.author}
                </Text>
              </Flex>
            </div>
          </Flex>
          <Box float="right">
            <StarIcon />
            {program.starnum}
            <BellIcon />
            {program.likenum}
          </Box>
        </div>
      </Card>
      {/* 프로그램 세부 설명창 */}

      <RoutineShort isDetail={true} result={program} />
      <Box float="right">
        <StarIcon marginRight="0.3em" />
        <BellIcon marginLeft="0.3em" />
      </Box>
      <br></br>
      <Box>
        <Flex alignSelf="center" justifyContent={"space-between"}>
          <Button
            onClick={goDetailRoutine}
            bg={"#9298E2"}
            flexGrow={1}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
          >
            {"취소"}
          </Button>
          <Button
            bg={ThemeColor.backgroundColor}
            flexGrow={1}
            _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
          >
            변형하기
          </Button>
        </Flex>
      </Box>
      {/* 날짜 입력 창 */}
      <Flex>
        <Text flex={2}>시작일</Text>
        <Input
          flex={4}
          defaultValue={todayDate}
          onChange={handleStartDate}
          type="date"
        />
      </Flex>
      {/* 운동 목록 */}
      {/* api완료 되면 exerciseList-> program.acts로 변경함 */}
      {exerciseList.map((exercise, index) => {
        //api완료 되면 dummy->exercise.actDB로 바꿔야 함.
        const dummy = exerciseList;
        return (
          <Flex
            width="100%"
            key={index}
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingRight="2em"
          >
            <div>
              <Flex alignItems={"center"}>
                <Img
                  src={dummy[index].images[0]}
                  width="30%"
                  marginRight="0.5em"
                />
                <Text fontSize="3vw">{dummy[index].name}</Text>
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
      })}

      {/* 주차별 루틴 */}
      <UnitRoutine
        isStart={true}
        unitDate={"week"}
        startDate={startDate}
        num={1}
        RMInfo={RMInfo}
      />

      <Flex>
        <Button flex={1}>Work out!</Button>
      </Flex>
    </BasicPageLayout>
  );
};
export default StartProgram;
