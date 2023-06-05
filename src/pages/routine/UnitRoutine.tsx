import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { programList } from "../../api/mocks/program.mock";
import DayRoutine from "./DayRoutine";
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

  return (
    <Box paddingY="0.5em">
      <Flex {...buttonProps} justifyContent={"space-between"} fontSize="0.7em">
        <Flex alignItems="center">
          <Text>{num + "주차"}</Text>
          {isOpen && <TriangleDownIcon transform={"rotate(0deg)"} />}
        </Flex>
        {isStart && (
          <Text>
            {" "}
            {getStartDate(startDate, num) + "~" + getEndDate(startDate, num)}
          </Text>
        )}
      </Flex>
      <div {...disclosureProps}>
        {dayname.map((day, index) => {
          return (
            <>
              <DayRoutine
                key={index}
                routine={routine}
                startDate={new Date(getStartDate(startDate, num))}
                isStart={isStart}
                RMInfo={RMInfo}
                idx={index}
              />
            </>
          );
        })}
      </div>
    </Box>
  );
};
export default UnitRoutine;
