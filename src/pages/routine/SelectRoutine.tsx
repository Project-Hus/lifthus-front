//create routine page tap

import { BellIcon, SearchIcon, StarIcon } from "@chakra-ui/icons";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Input, Flex, Card, Img, Text, Box, Th, Button, textDecoration } from "@chakra-ui/react";
import { routineDB, routineList } from "../../api/mocks/routineApi.mock";
import { css } from "@emotion/react";
import { ThemeColor } from "../../common/styles/theme.style";
import { useState } from "react";
import RoutineShort from "./RoutineShort";
const SelectRoutine = () => {
    const searchResult: routineDB[] = routineList
    const CardStyle = css`
    color: white;
    border-radius : 5% 5% 0px 0px;
    box-shadow  : 0px 5px 0px 0px ${ThemeColor.backgroundColorDarker};}};
    `
    //make state for selected result
    const [selectedResult, setSelectedResult] = useState<number>(-1);
    const handleResultClick = (resultId: number) => {
        if (selectedResult === resultId) {
            setSelectedResult(-1); // 같은 버튼을 클릭하면 선택 해제
        } else {
            setSelectedResult(resultId); // 다른 버튼을 클릭하면 선택
        }
    };
    const changeResultColor = (resultId: number) => {
        // 선택한 버튼에 따라 색상 스키마 지정
        if (selectedResult === resultId) {
            return ThemeColor.basicColor; // 선택된 버튼의 글자 색상을 파란색으로 지정
        }
        else {
            return ThemeColor.backgroundColor; // 선택되지 않은 버튼의 글자 색상을 회색으로 지정
        }
    }
    //설명 접기 기능을 위한 state
    const [IsFold, setFold] = useState(true);



    return (
        <div >
            <Tabs isFitted variant='unstyled' >
                <TabList >
                    <Tab _selected={{ color: 'white', bg: "#9298E2" }} fontSize="3vw">나의 프로그램</Tab>
                    <Tab _selected={{ color: 'white', bg: "#9298E2" }} fontSize="3vw">프로그램 검색</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p >내 프로그램 결과 출력</p>
                    </TabPanel>
                    <TabPanel>
                        <form>

                            <Flex >
                                <SearchIcon marginRight="0.4em" height="100%" alignSelf={"center"} />
                                <Input type="text" placeholder="프로그램 검색" />
                            </Flex>
                        </form>
                        <Box>

                            {searchResult.length > 0 && searchResult.map((result, idx) => {
                                return (
                                    <Card bg={changeResultColor(idx)} onClick={() => handleResultClick(idx)} marginY="0.5em" css={CardStyle} key={idx}>
                                        <RoutineShort isDetail={false} result={result} idx={idx} />
                                    </Card>
                                )
                            }
                            )
                            }
                        </Box>
                        <Box height="10%"></Box>
                        {selectedResult !== -1 &&
                            <>
                                < Card bg={changeResultColor(selectedResult)} onClick={() => handleResultClick(selectedResult)} marginY="0.5em" css={CardStyle} >
                                    <div>
                                        <Flex direction={"row"} margin="0.3em" >
                                            <div>
                                                <Flex>
                                                    <Text fontSize="ms" fontWeight={"bold"}>{searchResult[selectedResult].routineName}</Text>
                                                    <Text fontSize="ms" paddingLeft="0.5em">{"by" + searchResult[selectedResult].author}</Text>
                                                </Flex>
                                            </div>

                                        </Flex>
                                        <Box float="right">
                                            <StarIcon />{searchResult[selectedResult].starednum}
                                            <BellIcon />{searchResult[selectedResult].likenum}
                                        </Box >
                                    </div>
                                </Card>
                                {/* 세부사항 요약창 작성 */}
                                <RoutineShort isDetail={true} result={searchResult[selectedResult]} idx={selectedResult} />

                                <Flex alignSelf="center" justifyContent={"space-between"}>
                                    <Button bg={ThemeColor.backgroundColor} flexGrow={1} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }} > 프로그램 시작</Button>
                                    <Button bg={ThemeColor.backgroundColor} flexGrow={1} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>자세히 보기</Button>
                                </Flex>

                            </>
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div >
    );

}
export default SelectRoutine;