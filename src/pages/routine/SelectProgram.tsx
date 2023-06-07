//create routine page tap

import { BellIcon, SearchIcon, StarIcon } from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Flex,
  Card,
  Img,
  Text,
  Box,
  Th,
  Button,
  textDecoration,
} from "@chakra-ui/react";
import { programDB } from "../../store/interfaces/program.interface";
import { css } from "@emotion/react";
import { ThemeColor } from "../../common/styles/theme.style";
import { useEffect, useState } from "react";
import RoutineShort from "./RoutineShort";
import { Route, Routes, useNavigate } from "react-router-dom";
import DetailProgram from "./DetailProgram";
import useProgramStore, {
  useProgramPlanStore,
} from "../../store/program.zustand";
import { programList } from "../../api/mocks/program.mock";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { useForm } from "react-hook-form";
import programApi from "../../api/programApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../../api/userApi";
const SelectProgram = () => {
  const searchResult: programDB[] = programList;
  //현재 선택한 프로그램의 정보 저장하는 전역 state
  const { program, setProgramPlanInfo } = useProgramPlanStore();
  const CardStyle = css`
    color: white;
    border-radius : 5% 5% 0px 0px;
    box-shadow  : 0px 5px 0px 0px ${ThemeColor.backgroundColorDarker};}};
    `;
  const queryClient = useQueryClient();
  //make state for selected result 검색 결과 배열에서 선택한 프로그램의 인덱스를 저장
  const [selectedResult, setSelectedResult] = useState<number>(-1);
  const handleResultClick = (resultId: number) => {
    queryClient.invalidateQueries(["authorInfo"]);
    if (selectedResult === resultId) {
      setSelectedResult(-1); // 같은 버튼을 클릭하면 선택 해제
    } else {
      setSelectedResult(resultId); // 다른 버튼을 클릭하면 선택
    }
  };
  // 선택한 버튼에 따라 색상 스키마 지정
  const changeResultColor = (resultId: number) => {
    if (selectedResult === resultId) {
      return ThemeColor.basicColor; // 선택된 버튼의 글자 색상을 파란색으로 지정
    } else {
      return ThemeColor.backgroundColor; // 선택되지 않은 버튼의 글자 색상을 회색으로 지정
    }
  };
  //경로 이동을 위한 useNavigate
  const navigate = useNavigate();
  const goDetailRoutine = () => {
    if (queriedPrograms)
      navigate("/routine/menu/detail/" + queriedPrograms[selectedResult].slug);
  };

  const goProgramStart = () => {
    if (queriedPrograms)
      navigate("/routine/menu/start/" + queriedPrograms[selectedResult].slug);
  };

  const { register, getValues } = useForm();
  // realtime search logic
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { data: queriedPrograms } = useQuery(
    ["search", "program", searchKeyword],
    () => {
      return programApi.queryProgramsByTitle(searchKeyword);
    },
    {
      enabled: !!searchKeyword,
    }
  );
  let TOK: NodeJS.Timeout = setTimeout(() => {});
  useEffect(() => () => clearTimeout(TOK), [TOK]);

  const { data: authorInfo } = useQuery(
    ["authorInfo"],
    () => {
      if (!queriedPrograms) return Promise.reject("no queriedPrograms");
      return userApi.getUserInfo({
        uid: queriedPrograms[selectedResult].author,
      });
    },
    {
      enabled: !!queriedPrograms,
    }
  );

  return (
    <>
      <BasicPageLayout>
        <Tabs isFitted variant="unstyled" width="100%">
          <TabList>
            <Tab
              borderRadius="5%"
              padding="5% 10%"
              _selected={{ color: "white", bg: "#9298E2" }}
              fontSize="0.7em"
              fontWeight="bold"
            >
              나의 프로그램
            </Tab>
            <Tab
              borderRadius="5%"
              padding="5% 10%"
              _selected={{ color: "white", bg: "#9298E2" }}
              fontSize="0.7em"
              fontWeight="bold"
            >
              프로그램 검색
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>...</p>
            </TabPanel>
            <TabPanel>
              <form>
                <Flex>
                  <Input
                    bg={ThemeColor.backgroundColorDarker}
                    type="text"
                    placeholder="프로그램 검색"
                    {...register("search", {
                      onChange: () => {
                        clearTimeout(TOK);
                        TOK = setTimeout(() => {
                          setSearchKeyword(getValues("search"));
                        }, 250);
                      },
                    })}
                  />
                </Flex>
              </form>
              <Box>
                {queriedPrograms &&
                  queriedPrograms.map((program, idx) => {
                    return (
                      <Card
                        bg={changeResultColor(idx)}
                        onClick={() => handleResultClick(idx)}
                        marginY="0.5em"
                        css={CardStyle}
                        key={idx}
                      >
                        <RoutineShort isDetail={false} result={program} />
                      </Card>
                    );
                  })}
              </Box>
              <Box height="10%"></Box>
              {selectedResult !== -1 && queriedPrograms && (
                <>
                  <Card
                    bg={changeResultColor(selectedResult)}
                    onClick={() => handleResultClick(selectedResult)}
                    marginY="1em"
                    css={CardStyle}
                  >
                    <div>
                      <Flex
                        direction={"row"}
                        margin="0.3em"
                        alignItems={"center"}
                      >
                        <Flex alignItems={"center"}>
                          <Text
                            fontSize="2rem"
                            fontWeight={"bold"}
                            paddingLeft="0.5rem"
                          >
                            {queriedPrograms[selectedResult].title}
                          </Text>
                          <Text fontSize="0.7rem" paddingLeft="0.7rem">
                            {"by"}
                          </Text>
                          <Text
                            fontSize="0.7rem"
                            paddingLeft="0.1rem"
                            fontWeight="bold"
                          >
                            {authorInfo?.username}
                          </Text>
                        </Flex>
                      </Flex>
                      <Box
                        float="right"
                        fontSize="1rem"
                        marginRight="1em"
                        marginBottom={"1em"}
                      >
                        👍... 📌...
                      </Box>
                    </div>
                  </Card>
                  {/* 세부사항 요약창 작성 */}
                  <RoutineShort
                    isDetail={true}
                    result={queriedPrograms[selectedResult]}
                  />

                  <Flex
                    alignSelf="center"
                    justifyContent={"space-between"}
                    borderY={`2px solid ${ThemeColor.backgroundColorDarker}`}
                  >
                    <Button
                      padding="10%"
                      bg={ThemeColor.backgroundColor}
                      flexGrow={1}
                      _hover={{
                        backgroundColor: ThemeColor.backgroundColorDarker,
                      }}
                      onClick={goProgramStart}
                    >
                      {" "}
                      프로그램 시작
                    </Button>
                    <Button
                      padding="10%"
                      borderRadius={"0px"}
                      onClick={goDetailRoutine}
                      bg={ThemeColor.backgroundColor}
                      flexGrow={1}
                      _hover={{
                        backgroundColor: ThemeColor.backgroundColorDarker,
                      }}
                    >
                      자세히 보기
                    </Button>
                  </Flex>
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </BasicPageLayout>
    </>
  );
};
export default SelectProgram;
