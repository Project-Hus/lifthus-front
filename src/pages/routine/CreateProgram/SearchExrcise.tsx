import React, { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { exerciseList } from "../../../api/mocks/program.mock";
import programApi from "../../../api/programApi";
import { actDB } from "../../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../../store/program.zustand";
import { cl, s } from "@fullcalendar/core/internal-common";

const SearchExercise = ({
  weekNum,
  dayNum,
}: {
  weekNum: number;
  dayNum: number;
}) => {
  const { register, getValues } = useForm();

  const { setProgramPlanInfo, program } = useProgramPlanStore();
  const [SearchResult, setSearchResult] = useState<actDB[]>([]);

  const [serachstring, setSerachstring] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerachstring(e.target.value);
  };
  const onsubmit = () => setSearchResult(exerciseList);

  const addExerciseHandler = (act: actDB) => {
    const newact = {
      week: weekNum,
      dayNum: dayNum,
      actDB: act,
    };
    setProgramPlanInfo({ acts: [...program.acts, newact] });
  };

  // real time search logic
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { data: queriedActs, isLoading } = useQuery(
    ["search", "act", searchKeyword],
    () => {
      return programApi.queryActsByName(searchKeyword);
    },
    {
      enabled: !!searchKeyword,
    }
  );
  let TOK: NodeJS.Timeout = setTimeout(() => {}, 1000);
  useEffect(() => () => clearTimeout(TOK), [TOK]);
  return (
    <>
      <Flex>
        <Input
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
        <Button type="button" onClick={onsubmit}>
          검색
        </Button>
      </Flex>
      {queriedActs &&
        queriedActs.map((act) => {
          return (
            <div key={act.id}>
              <Flex justifyContent={"space-between"}>
                <Img
                  src={
                    act.image ||
                    "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                  }
                  width="10%"
                  alt="exercise"
                />
                <Text>{act.name}</Text>
                <Text>
                  {(act.type == "rep" && "반복") ||
                    (act.type == "lap" && "시간")}
                </Text>
                <Text>
                  {act.upper && act.lower
                    ? "전신"
                    : act.upper
                    ? "상체"
                    : "하체"}
                </Text>
                <Button onClick={() => {}}>
                  <AddIcon />
                </Button>
              </Flex>
            </div>
          );
        })}
    </>
  );
};

export default SearchExercise;
