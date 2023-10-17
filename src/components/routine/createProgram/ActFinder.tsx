import { AddIcon } from "@chakra-ui/icons";
import { Button, Center, Image, Input, Select, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import actApi from "../../../api/actApi";
import { QueryActDto } from "../../../api/dtos/act.dto";
import BlueSpinner from "../../../common/components/spinners/BlueSpinner";
import { ThemeColor } from "../../../common/styles/theme.style";
import useProgramCreationStore, {
  CreateRoutineActState,
} from "../../../store/createProgram.zustand";

type ActFinderProps = {
  day: number;
};

const ActFinder = ({ day }: ActFinderProps) => {
  const [waitingSearch, setWaitingSearch] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: acts,
    isFetching,
    refetch,
  } = useQuery(["acts"], async () => {
    const searchingName = watch("actName");
    if (searchingName === "") return [];
    return await actApi.queryActsByName(watch("actName"));
  });

  const { register, watch } = useForm();
  const navigate = useNavigate();
  return (
    <ActFinderDiv>
      <div style={{ display: "flex" }}>
        <Button
          w="20%"
          variant="ghost"
          leftIcon={<AddIcon />}
          _hover={{ bgColor: ThemeColor.backgroundColorDarker }}
          onClick={() => {
            navigate("/routine/act/create");
          }}
        >
          새 동작 생성
        </Button>
        <Input
          w="60%"
          border="none"
          bgColor={ThemeColor.backgroundColorDarker}
          placeholder="동작 검색"
          fontSize="1.5rem"
          {...register("actName", {
            onChange: (e) => {
              if (waitingSearch) return;
              else {
                setWaitingSearch(true);
                setTimeout(() => {
                  console.log(waitingSearch);
                  queryClient.invalidateQueries(["acts"]);
                  refetch();
                  setWaitingSearch(false);
                }, 250);
              }
            },
          })}
        />
      </div>
      {acts?.map((act, idx) => (
        <SearchedAct key={idx} day={day} act={act} />
      ))}
      {(isFetching || waitingSearch) && <BlueSpinner />}
    </ActFinderDiv>
  );
};
export default ActFinder;

const ActFinderDiv = styled.div`
  border-bottom: 0.1rem solid ${ThemeColor.backgroundColorDarker};
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

type SearchedActProps = {
  day: number;
  act: QueryActDto;
};

const SearchedAct = ({ day, act }: SearchedActProps) => {
  const { addRoutineAct } = useProgramCreationStore();
  const lastVerImgCnt = act.imageSrcs.length;
  const imgSrc =
    lastVerImgCnt > 0
      ? act.imageSrcs[0]
      : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  return (
    <SearchedActDiv>
      <Image w="3.5rem" marginTop="0.1rem" marginBottom="0.1rem" src={imgSrc} />
      &nbsp;
      <Text
        padding="0.2rem"
        marginTop="auto"
        marginBottom="auto"
        bgColor={ThemeColor.backgroundColorDarker}
        borderRadius="1rem"
        fontSize={"1rem"}
      >
        {act.actType}
      </Text>
      &nbsp;
      <Text
        marginTop="auto"
        marginBottom="auto"
        textAlign={"left"}
        w="125rem"
        fontSize="1.25rem"
      >
        {act.name}
      </Text>
      <div style={{ width: "15%", margin: "auto" }}>
        <Button
          variant="unstyled"
          fontSize="1.5rem"
          marginTop="auto"
          marginBottom="auto"
          marginLeft="1rem"
          marginRight="1rem"
          border={`0.2rem solid ${ThemeColor.backgroundColorDarker}`}
          bgColor={ThemeColor.linkColor}
          _hover={{ bgColor: ThemeColor.linkColorHover }}
          onClick={() => {
            const ra: CreateRoutineActState = {
              actCode: act.code,
              stage: "main",
              repsOrMeters: 0,
              ratioOrSecs: 0,
            };
            addRoutineAct(day, ra);
          }}
        >
          <Center>
            <AddIcon />
          </Center>
        </Button>
      </div>
    </SearchedActDiv>
  );
};

const SearchedActDiv = styled.div`
  display: flex;
`;
