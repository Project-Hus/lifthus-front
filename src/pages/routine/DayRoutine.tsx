import { TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, Img, Box, Text, useDisclosure } from "@chakra-ui/react";
import { exerciseDB, programDB } from "../../api/mocks/routineApi.mock";

const DayRoutine = ({ routine, idx, isStart }: { routine: programDB, idx: number, isStart: boolean }) => {


    //Day Routine을 위한 useDisclosure
    const dayWindowHandle = useDisclosure()
    const getdayButtonProps = dayWindowHandle.getButtonProps
    const getdayDisclosureProps = dayWindowHandle.getDisclosureProps



    const daybuttonProps = getdayButtonProps()
    const daydisclosureProps = getdayDisclosureProps()
    return (
        <>
            <Box  {...daybuttonProps}>
                <TriangleDownIcon transform={dayWindowHandle.isOpen ? "rotate(0deg)" : "rotate(270deg)"} />

                <Text>{idx + "요일"}</Text>
            </Box>
            <Box {...daydisclosureProps} as="span" flex='1' textAlign='left'>
                <Flex direction={"row"} justifyContent={"space-around"} width="70%" verticalAlign={"center"}>
                    {routine.images ? <Img src={routine.images[0]} boxSize="2em" /> : null}
                    <Text>{routine.routineName}</Text>
                    {(routine.weight && isStart) ? <Text>{routine.weight + "kg"}</Text> : "60%"}
                    {routine.sets && (
                        <>
                            <Text>{"x" + routine.sets}</Text>
                            {isStart &&

                                <Flex direction={"column"}>
                                    <Text>reps</Text>
                                    <Text>{routine.sets + "/" + routine.sets}</Text>
                                </Flex>

                            }
                        </>
                    )
                    }
                </Flex>
            </Box>
        </>
    )
}
export default DayRoutine;