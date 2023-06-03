//검색 창 컴포넌트를 만들어줘야 함.
import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { exerciseList } from "../../../api/mocks/program.mock";
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

  const { register, handleSubmit } = useForm<SearchFormData>();

  const onSubmit = () => {
    setSearchResult(exerciseList);
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("searchTerm")}
          type="text"
          placeholder="검색어를 입력하세요"
        />
        <Button type="submit">검색</Button>
      </form>
      {SearchResult.length > 0 &&
        SearchResult.map((exercise) => {
          return (
            <div key={exercise.id}>
              <Flex justifyContent={"space-between"}>
                <Img src={exercise.images[0]} width="10%" alt="exercise" />
                <Text>{exercise.name}</Text>
                <Text>{exercise.type}</Text>
                <Text>{exercise.bodyPart ? exercise.bodyPart : "없음"}</Text>
                <Button onClick={() => addExerciseHandler(exercise)}>
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
