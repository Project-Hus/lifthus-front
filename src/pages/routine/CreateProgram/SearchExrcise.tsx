import React, { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import programApi from "../../../api/programApi";
import useNewWeeklyProgramStore from "../../../store/createWeeklyProgram.zustand";
import { ThemeColor } from "../../../common/styles/theme.style";

const SearchExercise = ({ week, day }: { week: number; day: number }) => {
  const { register, getValues } = useForm();

  const { addRoutineAct } = useNewWeeklyProgramStore();

  // real time search logic
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { data: queriedActs } = useQuery(
    ["search", "act", searchKeyword],
    () => {
      return programApi.queryActsByName(searchKeyword);
    },
    {
      enabled: !!searchKeyword,
    }
  );
  let TOK: NodeJS.Timeout = setTimeout(() => {});
  useEffect(() => () => clearTimeout(TOK), [TOK]);
  return (
    <>
      <Flex
        borderY={`3px solid ${ThemeColor.backgroundColorDarker}`}
        paddingY="0.3em"
      >
        <Input
          bg={ThemeColor.backgroundColorDarker}
          textAlign="right"
          type="text"
          placeholder="검색어를 입력하세요"
          {...register("search", {
            onChange: (e) => {
              clearTimeout(TOK);
              TOK = setTimeout(() => {
                setSearchKeyword(getValues("search"));
              }, 250);
            },
          })}
        />
      </Flex>
      <div>
        {queriedActs &&
          queriedActs.map((act) => {
            return (
              <div key={act.id} style={{ width: "95%", margin: "auto" }}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderBottom={`2px solid ${ThemeColor.backgroundColorDarker}`}
                  _hover={{
                    bgColor: ThemeColor.backgroundColorDarker,
                    cursor: "pointer",
                  }}
                >
                  <Img
                    src={
                      act.image ||
                      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                    }
                    width="5vw"
                    alt="act"
                  />
                  <Text marginRight="auto">&nbsp;{act.name}</Text>
                  <Flex>
                    <Text>
                      {(act.type == "rep" && "반복") ||
                        (act.type == "lap" && "시간")}
                    </Text>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Text marginRight="1em">
                      {act.upper && act.lower
                        ? "전신"
                        : act.upper
                        ? "상체"
                        : "하체"}
                    </Text>
                    <Button
                      onClick={() => {
                        addRoutineAct(week, day, act);
                      }}
                      bg={ThemeColor.backgroundColor}
                      _hover={{
                        backgroundColor: ThemeColor.basicColor,
                      }}
                      border={`1px solid ${ThemeColor.backgroundColorDarker}`}
                      marginRight="0.5em"
                    >
                      <AddIcon fontSize="1.5em" />
                    </Button>
                  </Flex>
                </Flex>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchExercise;
