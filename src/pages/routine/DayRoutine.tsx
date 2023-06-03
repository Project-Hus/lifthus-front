import { TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, Img, Box, Text, useDisclosure } from "@chakra-ui/react";
import { programDB } from "../../store/interfaces/program.interface";

const DayRoutine = ({
  routine,
  idx,
  isStart,
}: {
  routine: programDB;
  idx: number;
  isStart: boolean;
}) => {
  //Day Routine을 위한 useDisclosure
  const dayWindowHandle = useDisclosure();
  const getdayButtonProps = dayWindowHandle.getButtonProps;
  const getdayDisclosureProps = dayWindowHandle.getDisclosureProps;

  const daybuttonProps = getdayButtonProps();
  const daydisclosureProps = getdayDisclosureProps();
  return (
    <>
      <Box {...daybuttonProps}>
        <TriangleDownIcon
          transform={dayWindowHandle.isOpen ? "rotate(0deg)" : "rotate(270deg)"}
        />

        <Text>{idx + "요일"}</Text>
      </Box>
      <Box {...daydisclosureProps} as="span" flex="1" textAlign="left">
        <Flex
          direction={"row"}
          justifyContent={"space-around"}
          width="70%"
          verticalAlign={"center"}
        >
          {routine.images ? (
            <Img src={routine.images[0]} boxSize="2em" />
          ) : null}
          <Text>{routine.name}</Text>
          {isStart ? <Text>{20 + "kg"}</Text> : "60%"}
          {
            <>
              <Text>{"x" + 3}</Text>
              {isStart && (
                <Flex direction={"column"}>
                  <Text>reps</Text>
                  <Text>{3 + "/" + 3}</Text>
                </Flex>
              )}
            </>
          }
        </Flex>
      </Box>
    </>
  );
};
export default DayRoutine;
