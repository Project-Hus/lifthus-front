import { TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, Img, Box, Text, useDisclosure, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { exerciseList } from "../../api/mocks/program.mock";
import { ThemeColor } from "../../common/styles/theme.style";
import { programDB } from "../../store/interfaces/program.interface";
import { userRMInfo } from "./StartPrgram";



const DayRoutine = ({
  routine,
  startDate,
  isStart,
  RMInfo,
  idx,
}: {
  routine: programDB;
  startDate: Date;
  isStart: boolean;
  RMInfo: userRMInfo;
  idx: number;
}) => {
  //emotion style component for ActInfo

  const DayActStyle = styled.div`
  align-items: center;
  padding: 0.5em;
  border-bottom: 2px solid ${ThemeColor.backgroundColorDarker};
  `


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
  console.log(RMInfo);
  return (
    <>
      <DayActStyle>
        <Box {...daybuttonProps} fontSize="3vw" >
          <Flex alignItems={"center"}>
            <Flex wrap="nowrap" alignItems={"center"} marginRight="2.4em">
              <Text >{dayname[idx] + "요일"}</Text>
              {dayWindowHandle.isOpen && <TriangleDownIcon

              />
              }
            </Flex>

            {isStart && <Text>{newDate.toISOString().slice(0, 10)}</Text>}
          </Flex>
        </Box>
      </DayActStyle>
      <Box {...daydisclosureProps} as="span" flex="1" textAlign="left">
        {exerciseList.map((act, idx) => {
          return (
            <DayActStyle>

              <Box fontSize={"3vw"} paddingLeft="0.5em">
                <Flex
                  key={idx}
                  direction={"row"}
                  width="auto"
                  textAlign={"left"}
                  alignItems={"center"}
                >
                  {act.images ? <Img borderRadius="5%" marginRight="2vw" src={act.images[0]} boxSize="10vw" /> : null}
                  <Text marginRight="2vw" fontWeight="bold">{act.name}</Text>
                  {isStart && act.type == "repeat" && (
                    <>
                      <Flex marginRight="2vw">
                        <Text>{RMInfo.rm ? 20 * RMInfo.rm : 0}</Text>
                        {"kg"}
                      </Flex>
                      &nbsp;
                      <Text>
                        x3
                      </Text>
                      &nbsp;
                      &nbsp;
                      <Flex direction={"column"} marginRight="2vw" alignItems={"center"} justifyContent="center">
                        <Text>Reps</Text>
                        <Text fontWeight={"bold"}>{3 + "/" + 3}</Text>
                      </Flex>
                    </>
                  )}
                  {act.type == "time" && (
                    <Flex alignItems={"center"} fontSize="3vw">
                      <Input textAlign={"center"} fontSize="3vw" minWidth="6vw" maxWidth={"50px"} padding="0" defaultValue={200}></Input>
                      <Text>초</Text>
                    </Flex>
                  )}
                </Flex>
              </Box>
            </DayActStyle>

          );
        })}
      </Box>
    </>
  );
};
export default DayRoutine;
