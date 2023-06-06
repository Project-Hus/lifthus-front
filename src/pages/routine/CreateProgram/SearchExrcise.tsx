//검색 창 컴포넌트를 만들어줘야 함.
import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { exerciseList } from "../../../api/mocks/program.mock";
import { ThemeColor } from "../../../common/styles/theme.style";
import { actDB } from "../../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../../store/program.zustand";

type SearchFormData = {
  searchTerm: string;
};

const SearchExercise = ({
  weekNum,
  dayNum,
}: {
  weekNum: number;
  dayNum: number;
}) => {
  const { setProgramPlanInfo, program } = useProgramPlanStore();
  const [SearchResult, setSearchResult] = useState<actDB[]>([]);
  type SearchFormData = {
    searchTerm: string;
  };

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

  return (
    <>
      <Flex borderY={`3px solid ${ThemeColor.backgroundColorDarker}`} paddingY="0.3em">
        <Input
          bg={ThemeColor.backgroundColorDarker}
          textAlign="right"
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={handleSearch}
        />
        <Button type="button" onClick={onsubmit}>
          검색
        </Button>
      </Flex>
      {SearchResult.length > 0 &&
        SearchResult.map((exercise) => {
          return (
            <div key={exercise.id}>
              <Flex alignItems={"center"} justifyContent={"space-between"} borderBottom={`2px solid ${ThemeColor.backgroundColorDarker}`}>
                <Img src={exercise.images[0]} boxSize="10vw" alt="exercise" />
                <Text>{exercise.name}</Text>
                <Text>{exercise.type}</Text>
                <Text>{exercise.bodyPart ? exercise.bodyPart : "없음"}</Text>
                <Button onClick={() => addExerciseHandler(exercise)} bg={ThemeColor.backgroundColor} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>
                  +
                </Button>
              </Flex>
            </div>
          );
        })}
    </>
  );
};

export default SearchExercise;
