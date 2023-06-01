import { StarIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Flex, Img, Input, Text } from "@chakra-ui/react";
import RoutineShort from "./RoutineShort";
import { exerciseList, programDB } from "../../api/mocks/routineApi.mock";
import { ThemeColor } from "../../common/styles/theme.style";
import { css } from "@emotion/react";
import useProgramStore from "../../store/program.zustand";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import UnitRoutine from "./UnitRoutine";
import { useNavigate } from "react-router-dom";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";

const DetailProgram = () => {
    const CardStyle = css`
    color: white;
    border-radius : 5% 5% 0px 0px;
    box-shadow  : 0px 5px 0px 0px ${ThemeColor.backgroundColorDarker};}};
    `
    const ExerciseList = exerciseList

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
    const [isStart, setStart] = useState(true);
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const todayDate = new Date().toISOString().split('T')[0]
    const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    }
    // Date 를 입력받고 7일 후 날짜를 반환하는 함수
    const getEndDate = (startDate: string, week: number) => {
        const start = new Date(startDate);
        const end = new Date(start.setDate(start.getDate() + 7 * week));
        return end.toISOString().slice(0, 10);
    }

    const navigate = useNavigate();
    const goProgramStart = () => {
        navigate('/routine/menu/start');
    };

    return (
        <BasicPageLayout>

            <>

                {/* 프로그램 기몬 정보 창 */}
                < Card bg={ThemeColor.basicColor} marginY="0.5em" css={CardStyle} width="100%">
                    <div>
                        <Flex direction={"row"} margin="0.3em" >
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
                {/* 프로그램 세부 설명창 */}

                < RoutineShort isDetail={true} result={program} />
                <Box float="right">
                    <StarIcon marginRight="0.3em" />
                    <BellIcon marginLeft="0.3em" />
                </Box >
                <br></br>
                <Box>
                    <Flex alignSelf="center" justifyContent={"space-between"}>
                        <Button onClick={goProgramStart} bg={isStart ? "#9298E2" : ThemeColor.backgroundColor} flexGrow={1} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }} >
                            {"프로그램 시작"}
                        </Button>
                        <Button bg={ThemeColor.backgroundColor} flexGrow={1} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>변형하기</Button>
                    </Flex>
                </Box>
                {/* 주차별 루틴 */}
                <UnitRoutine isStart={false} unitDate={"week"} startDate={startDate} num={1} />
            </>
        </BasicPageLayout>

    )
}
export default DetailProgram;