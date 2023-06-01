import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'


//make WeekRoutine compoenet
const UnitRoutine = ({ isStart, unitDate, startDate, num }: { isStart: boolean, unitDate: string, startDate: string, num: number }) => {

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
    const { getDisclosureProps, getButtonProps, isOpen } = useDisclosure()
    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()


    return (
        <Box>
            <Flex justifyContent={"space-between"}>
                <Text>{num + "주차"}</Text>
                <TriangleDownIcon {...buttonProps} transform={isOpen ? "rotate(0deg)" : "rotate(270deg)"} />
                {isStart && <Text> {getStartDate(startDate, num) + "~" + getEndDate(startDate, num)}</Text>}
            </Flex>

            <Text {...disclosureProps}> Test</Text>
        </Box>
    )
}
export default UnitRoutine;
