import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import { programList } from "../../api/mocks/routineApi.mock";
import DayRoutine from "./DayRoutine";

//make WeekRoutine compoenet
const UnitRoutine = ({ isStart, unitDate, startDate, num }: { isStart: boolean, unitDate: string, startDate: string, num: number }) => {
    const testmock = programList
    const routine = testmock[1]
    const days: string[] = ["월", "화", "수", "목", "금", "토", "일"]


    const getStartDate = (startDate: string, num: number) => {
        const date = new Date(startDate)
        date.setDate(date.getDate() + 7 * (num - 1));
        return date.toISOString().slice(0, 10)

    }
    const getEndDate = (startDate: string, week: number) => {

        const start = new Date(startDate);
        const end = new Date(start.setDate(start.getDate() + 7 * week));
        return end.toISOString().slice(0, 10);
    }
    //Week Routine을 위한 useDisclosure
    const weekWindowHandle = useDisclosure()
    const buttonProps = weekWindowHandle.getButtonProps()
    const disclosureProps = weekWindowHandle.getDisclosureProps()

    //Day Routine을 위한 useDisclosure
    const dayWindowHandle = useDisclosure()
    const getdayButtonProps = dayWindowHandle.getButtonProps
    const getdayDisclosureProps = dayWindowHandle.getDisclosureProps



    const daybuttonProps = getdayButtonProps()
    const daydisclosureProps = getdayDisclosureProps()


    return (

        <Box>
            <Flex justifyContent={"space-between"}>
                <Text>{num + "주차"}</Text>
                <TriangleDownIcon {...buttonProps} transform={weekWindowHandle.isOpen ? "rotate(0deg)" : "rotate(270deg)"} />
                {isStart && <Text> {getStartDate(startDate, num) + "~" + getEndDate(startDate, num)}</Text>}
            </Flex>
            <div {...disclosureProps}>
                {days.map((day, index) => {
                    return (
                        <>
                            <DayRoutine routine={routine} idx={index} isStart={isStart} />
                            {/* <Box {...disclosureProps} {...daybuttonProps}>
                            <TriangleDownIcon {...buttonProps} transform={dayWindowHandle.isOpen ? "rotate(0deg)" : "rotate(270deg)"} />

                            <Text>{day + "요일"}</Text>
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
                        </Box> */}

                        </>
                    )
                }
                )}
            </div>
        </Box>
    )
}
export default UnitRoutine;
