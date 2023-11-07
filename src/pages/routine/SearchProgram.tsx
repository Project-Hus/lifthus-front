import { Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import {
  CreateProgramHeadDiv,
  CreateProgramInternalDiv,
} from "./CreateProgram";
import { RoutinePanel } from "./Routine";
import programApi from "../../api/programApi";
import { QueryProgramDto } from "../../api/dtos/program.dto";
import { useNavigate } from "react-router-dom";

const SearchProgram = () => {
  const [waitSearch, setWaitSearch] = useState(false);
  const queryClient = useQueryClient();
  const { data, isFetching, refetch } = useQuery(["searchProgram"], async () =>
    programApi.queryProgramsByTitle(watch("searchTitle"))
  );
  const { register, watch } = useForm();
  return (
    <BasicPageLayout>
      <RoutinePanel>
        <CreateProgramHeadDiv>프로그램 검색</CreateProgramHeadDiv>
        <CreateProgramInternalDiv noBorder={true}>
          <Text fontWeight="bold" marginTop="1rem">
            프로그램 이름
          </Text>
          <Input
            border="none"
            bgColor={ThemeColor.backgroundColorDarker}
            w="90%"
            margin="1rem"
            textAlign={"center"}
            fontSize="2rem"
            {...register("searchTitle", {
              onChange: () => {
                if (waitSearch) return;
                setWaitSearch(true);
                setTimeout(() => {
                  setWaitSearch(false);
                  queryClient.invalidateQueries(["searchProgram"]);
                  refetch();
                }, 250);
              },
            })}
          />
        </CreateProgramInternalDiv>
        <CreateProgramInternalDiv>
          {!!data && data?.map((qpdto) => <SearchedProgram program={qpdto} />)}
        </CreateProgramInternalDiv>
      </RoutinePanel>
    </BasicPageLayout>
  );
};
export default SearchProgram;

const SearchedProgram = ({ program: p }: { program: QueryProgramDto }) => {
  const latestRelease = p.releases[p.releases.length - 1];
  const imgSrc =
    latestRelease.imageSrcs.length > 0
      ? latestRelease.imageSrcs[0]
      : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  const textAbs =
    latestRelease.text.length > 30
      ? latestRelease.text.slice(0, 30) + "..."
      : latestRelease.text;
  const navigate = useNavigate();
  return (
    <Flex
      borderTop={`0.1rem solid ${ThemeColor.backgroundColorDarker}`}
      padding="0.5rem"
      _hover={{ bgColor: ThemeColor.basicColor, cursor: "pointer" }}
      onClick={() => {
        navigate(`/routine/program/code${p.code}`);
      }}
    >
      <Image src={imgSrc} w="6rem" borderRadius="1rem" margin="0.5rem" />
      <Stack>
        <Flex>
          <div>
            <Text fontWeight="bold" fontSize="1.5rem">
              {p.title}
            </Text>
            <Text fontSize="0.75rem" textAlign="left">
              {p.code}
            </Text>
          </div>
        </Flex>
        <Flex>
          <Text>{textAbs}</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};
