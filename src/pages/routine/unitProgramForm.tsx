import { CheckIcon, EditIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { useState } from "react"
import { exerciseDB } from "../../api/mocks/routineApi.mock"
import SearchExercise from "./CreateProgram/SearchExrcise"

export const WeekProgramForm = ({ week }: { week: number }) => {
    const { getDisclosureProps, getButtonProps, isOpen, onClose } = useDisclosure()

    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()
    const defaultDays = ['월', '화', '수', '목', '금']

    return (
        <>
            <Box {...buttonProps}>
                {week + "주차"}
                {isOpen && <TriangleDownIcon />}
            </Box>
            {defaultDays.map((day, index) => {
                return (
                    <Box key={index} {...disclosureProps}>
                        <DayProgramForm weekdays={day} />
                    </Box>
                )

            }
            )
            }

        </>

    )
}

const DayProgramForm = ({ weekdays }: { weekdays: string }) => {
    //for expand and collapse of day program
    const { getDisclosureProps, getButtonProps, isOpen, onClose, onOpen } = useDisclosure()
    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()
    //for expand searchWindow
    const EditProps = useDisclosure()
    const EditbuttonProps = EditProps.getButtonProps()
    const EditdisclosureProps = EditProps.getDisclosureProps()

    //state for day of exercise list
    const [exerciseList, setExerciseList] = useState<exerciseDB[]>([])


    return (
        <Box paddingLeft="3%">
            <Flex direction="column">
                <Box {...buttonProps}><TriangleDownIcon transform={isOpen ? "rotate(0deg)" : "rotate(270deg)"} />{weekdays + "요일"}</Box>
                <Box {...disclosureProps}>{weekdays}</Box>
                <Box {...EditdisclosureProps} ><SearchExercise /></Box>
                <Button {...EditdisclosureProps}>make new excercise</Button>
                {EditProps.isOpen
                    ? <Button {...EditbuttonProps}><CheckIcon /></Button>
                    : <Button {...EditbuttonProps}><EditIcon /></Button>
                }
            </Flex>

        </Box>
    )
}

export default WeekProgramForm
