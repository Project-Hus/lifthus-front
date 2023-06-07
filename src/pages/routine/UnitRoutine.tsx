import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { programList } from "../../api/mocks/program.mock";
import { ThemeColor } from "../../common/styles/theme.style";
import DayRoutine from "./DayRoutine";
import { BottomBorder } from "./DetailProgram";
import { userRMInfo } from "./StartPrgram";

//make WeekRoutine compoenet
const UnitRoutine = ({
  isStart,
  unitDate,
  startDate,
  num,
  RMInfo,
}: {
  isStart: boolean;
  unitDate: string;
  startDate: string;
  num: number;
  RMInfo: userRMInfo;
}) => {
  const testmock = programList;
  const routine = testmock[1];
  const dayname: string[] = ["월", "화", "수", "목", "금", "토", "일"];

  const getStartDate = (startDate: string, num: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 7 * (num - 1));
    return date.toISOString().slice(0, 10);
  };
  const getEndDate = (startDate: string, week: number) => {
    const start = new Date(startDate);
    const end = new Date(start.setDate(start.getDate() + 7 * week));
    return end.toISOString().slice(0, 10);
  };
  //day Routine을 위한 useDisclosure
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  const DayBorder = styled.div`
  border-bottom: 2px solid ${ThemeColor.backgroundColorDarker};
  `;

  return (
    <Box >
      <BottomBorder>

        <Flex {...buttonProps} justifyContent={"space-between"} fontSize="5vw">

          <Flex alignItems="center" paddingY="3vw" paddingLeft="0.5em">

            <Text fontWeight="bold" >{num + "주차"}</Text>
            &nbsp;
            {isOpen && <TriangleDownIcon transform={"rotate(0deg)"} />}
          </Flex>
          {isStart && (
            <Flex marginRight="2em" textAlign={"end"} alignItems={"center"} >
              <Text fontSize="3vw" alignItems={"end"} verticalAlign="center">
                {" "}
                {getStartDate(startDate, num) + "~" + getEndDate(startDate, num)}
              </Text>
            </Flex>
          )}
        </Flex>
      </BottomBorder>

      <div {...disclosureProps}>
        {dayname.map((day, index) => {
          return (
            <>
              <DayBorder>
                <DayRoutine
                  key={index}
                  routine={routine}
                  startDate={new Date(getStartDate(startDate, num))}
                  isStart={isStart}
                  RMInfo={RMInfo}
                  idx={index}
                />
              </DayBorder>
            </>
          );
        })}
      </div>
    </Box>

  );
};
export default UnitRoutine;
