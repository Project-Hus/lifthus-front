import { TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, Img, Box, Text, useDisclosure, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { QueryRoutineActDto } from "../../api/dtos/program/program.dto";
import { exerciseList } from "../../api/mocks/program.mock";
import programApi from "../../api/programApi";
import { ThemeColor } from "../../common/styles/theme.style";
import { programDB } from "../../store/interfaces/program.interface";
import { userRMInfo } from "./StartPrgram";
export const DayActStyle = styled.div`
  align-items: center;
  padding: 0.1em;
  border-bottom: 2px solid ${ThemeColor.backgroundColorDarker};
`;

const DayRoutine = ({
  startDate,
  isStart,
  routineActs,
  idx,
}: {
  startDate: Date;
  isStart: boolean;
  routineActs: QueryRoutineActDto[];
  idx: number;
}) => {
  //Day Routine을 위한 useDisclosure
  const dayWindowHandle = useDisclosure();
  const getdayButtonProps = dayWindowHandle.getButtonProps;
  const getdayDisclosureProps = dayWindowHandle.getDisclosureProps;

  const daybuttonProps = getdayButtonProps();
  const daydisclosureProps = getdayDisclosureProps();

  //날짜 표시을 위한 변수
  const dayname = ["월", "화", "수", "목", "금", "토", "일"];

  const addDaysToDate = ({ date, days }: { date: Date; days: number }) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    console.log(newDate.getDate());

    return newDate;
  };
  const newDate = addDaysToDate({ date: startDate, days: idx });
  return (
    <>
      <DayActStyle>
        <Box {...daybuttonProps} fontSize="3vw">
          <Flex alignItems={"center"}>
            <Flex wrap="nowrap" alignItems={"center"} marginRight="2.4em">
              <Text>{dayname[idx] + "요일"}</Text>
              {dayWindowHandle.isOpen && <TriangleDownIcon />}
            </Flex>

            {isStart && <Text>{newDate.toISOString().slice(0, 10)}</Text>}
          </Flex>
        </Box>
      </DayActStyle>
      <Box {...daydisclosureProps} as="span" flex="1" textAlign="left">
        {routineActs.map((ra, idx) => {
          return <RoutineAct key={idx} isStart={isStart} ra={ra} />;
        })}
      </Box>
    </>
  );
};

const RoutineAct = ({
  isStart,
  ra,
}: {
  isStart: boolean;
  ra: QueryRoutineActDto;
}) => {
  const { data: act } = useQuery(["act", ra.act_id], () =>
    programApi.queryActById(ra.act_id)
  );
  if (act)
    return (
      <DayActStyle>
        <Box fontSize={"3vw"} paddingLeft="0.5em">
          <Flex
            direction={"row"}
            width="auto"
            textAlign={"left"}
            alignItems={"center"}
          >
            <Img
              borderRadius="5%"
              marginRight="2vw"
              src={
                "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
              }
              boxSize="10vw"
            />
            <Text marginRight="2vw" fontWeight="bold">
              {act.name}
            </Text>
            {isStart && act.type === "rep" && (
              <>
                <Flex marginRight="2vw">
                  <Text>{ra.w_ratio ? 20 * ra.w_ratio : 0}</Text>
                  {"kg"}
                </Flex>
                &nbsp;
                <Text>x3</Text>
                &nbsp; &nbsp;
                <Flex
                  direction={"column"}
                  marginRight="2vw"
                  alignItems={"center"}
                  justifyContent="center"
                >
                  <Text>Reps</Text>
                  <Text fontWeight={"bold"}>{3 + "/" + 3}</Text>
                </Flex>
              </>
            )}
            {act.type === "lap" && (
              <Flex alignItems={"center"} fontSize="3vw">
                <Input
                  textAlign={"center"}
                  fontSize="3vw"
                  minWidth="6vw"
                  maxWidth={"50px"}
                  padding="0"
                  defaultValue={200}
                ></Input>
                <Text>초</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </DayActStyle>
    );
  else return <></>;
};
export default DayRoutine;
