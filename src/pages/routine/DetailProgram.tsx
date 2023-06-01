import { StarIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Card, Flex, Img, Text } from "@chakra-ui/react";
import RoutineShort from "./RoutineShort";
import { programDB } from "../../api/mocks/routineApi.mock";
import { ThemeColor } from "../../common/styles/theme.style";
import { css } from "@emotion/react";
import useProgramStore from "../../store/program.zustand";

const DetailProgram = () => {
    const CardStyle = css`
    color: white;
    border-radius : 5% 5% 0px 0px;
    box-shadow  : 0px 5px 0px 0px ${ThemeColor.backgroundColorDarker};}};
    `
    const currentProgram = useProgramStore()
    const program: programDB = {
        id: currentProgram.id,
        routineName: currentProgram.routineName,
        author: currentProgram.author,
        starednum: currentProgram.starednum,
        likenum: currentProgram.likenum,
        description: currentProgram.description,
        trainingType: currentProgram.trainingType,
        timer: currentProgram.timer,
        images: currentProgram.images,
        updated_at: currentProgram.updated_at,
        created_at: currentProgram.created_at,
        date: currentProgram.date,
    }
    return (
        <>

            {/* <RoutineShort isDetail={false} result={program} /> */}
            < Card bg={ThemeColor.basicColor} marginY="0.5em" css={CardStyle} width="100%">
                <div>
                    <Flex direction={"row"} margin="0.3em" >
                        <Img src={program.images ? program.images[0] : ""} width="100px" height="100px" />
                        <div>

                            <Flex>
                                <Text fontSize="ms" fontWeight={"bold"}>{program.routineName}</Text>
                                <Text fontSize="ms" paddingLeft="0.5em">{"by" + program.author}</Text>
                            </Flex>
                        </div>

                    </Flex>
                    <Box float="right">
                        <StarIcon />{program.starednum}
                        <BellIcon />{program.likenum}
                    </Box >
                </div >
            </Card >
            {/* 세부사항 요약창 작성 */}
            {/* < RoutineShort isDetail={true} result={program} /> */}

        </>
    )
}
export default DetailProgram;