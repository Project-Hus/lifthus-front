import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { programList } from "../../api/mocks/program.mock";
import DayRoutine from "./DayRoutine";

//make WeekRoutine compoenet
const UnitRoutine = ({
  isStart,
  unitDate,
  startDate,
  num,
}: {
  isStart: boolean;
  unitDate: string;
  startDate: string;
  num: number;
}) => {
  const testmock = programList;
  const routine = testmock[1];
  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];

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
  const dayWindowHandle = useDisclosure();
  const buttonProps = dayWindowHandle.getButtonProps();
  const disclosureProps = dayWindowHandle.getDisclosureProps();

  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Text>{num + "주차"}</Text>
        <TriangleDownIcon
          {...buttonProps}
          transform={dayWindowHandle.isOpen ? "rotate(0deg)" : "rotate(270deg)"}
        />
        {isStart && (
          <Text>
            {" "}
            {getStartDate(startDate, num) + "~" + getEndDate(startDate, num)}
          </Text>
        )}
      </Flex>
      <div {...disclosureProps}>
        {days.map((day, index) => {
          return (
            <>
              <DayRoutine
                key={index}
                routine={routine}
                idx={index}
                isStart={isStart}
              />
            </>
          );
        })}
      </div>
    </Box>
  );
};
export default UnitRoutine;
