import { StarIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Flex, Img, Input, Text } from "@chakra-ui/react";
import RoutineShort from "./RoutineShort";
import { exerciseList, programDB } from "../../api/mocks/routineApi.mock";
import { ThemeColor } from "../../common/styles/theme.style";
import { css } from "@emotion/react";
import useProgramStore from "../../store/program.zustand";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import UnitRoutine from "./UnitRoutine";
import { start } from "repl";
import { useNavigate } from "react-router-dom";
const StartProgram = () => {
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
    const [isStart, setStart] = useState(false);
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

    //경로 이동을 위한 useNavigate
    const navigate = useNavigate();
    const goDetailRoutine = () => {
        navigate('/routine/menu/detail');
    };

    return (
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
                    <Button onClick={goDetailRoutine} bg={isStart ? "#9298E2" : ThemeColor.backgroundColor} flexGrow={1} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }} >
                        {"취소"}
                    </Button>
                    <Button bg={ThemeColor.backgroundColor} flexGrow={1} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>변형하기</Button>
                </Flex>
            </Box>
            {/* 날짜 입력 창 */}
            <Flex>
                <Text flex={2}>시작일</Text>
                <Input flex={4} defaultValue={todayDate} onChange={handleStartDate} type="date" />
            </Flex>
            {/* 운동 목록 */}
            {ExerciseList.map((exercise, index) => {
                return (
                    <Flex key={index} alignItems={"center"}>
                        <div>
                            <Flex alignItems={"center"}>
                                <Img src={exercise.images[0]} width="30%" />
                                <Text >{exercise.name}</Text>
                            </Flex>
                        </div>
                        <span>
                            <Flex >
                                <Text>1rm:</Text>
                                <Input min="0" width="auto" type="number" />kg
                            </Flex>
                        </span>

                    </Flex>

                )
            })
            }

            {/* 주차별 루틴 */}
            <UnitRoutine isStart={true} unitDate={"week"} startDate={startDate} num={1} />

            <Flex>
                <Button flex={1}>Work out!</Button>
            </Flex>


        </>
    )
}
export default StartProgram;