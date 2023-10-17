import { Button, Flex, Img, Input, Text, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import programApi from "../../api/programApi";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import TypeSelector from "../../components/routine/createProgram/CreateProgramTypeSelector";
import WeeklyProgramBuilder from "../../components/routine/createProgram/WeeklyProgramBuilder";
import useProgramCreationFeats from "../../hooks/createProgram";
import useProgramCreationStore from "../../store/createProgram.zustand";
import { RoutinePanel } from "./Routine";

const CreateProgram = () => {
  const { programType, title, text, setTitle, setText, clear } =
    useProgramCreationStore();

  const { dto, isProgramValid } = useProgramCreationFeats();

  const { mutate } = useMutation(async () => programApi.createProgram(dto), {
    onSuccess: (data) => {
      clear();
      window.history.back();
    },
    onError: (error) => {
      alert("프로그램 생성 실패");
    },
  });

  const { register, watch } = useForm();

  return (
    <BasicPageLayout>
      <RoutinePanel>
        <CreateProgramHeadDiv>새 프로그램 생성</CreateProgramHeadDiv>
        <CreateProgramInternalDiv noBorder={true}>
          <Text fontWeight="bold" marginTop="1rem">
            프로그램 이름
          </Text>
          <Input
            defaultValue={title}
            border="none"
            bgColor={ThemeColor.backgroundColorDarker}
            w="70%"
            margin="1rem"
            textAlign={"center"}
            fontSize="1.5rem"
            {...register("programTitle", {
              onChange: () => {
                setTitle(watch("programTitle"));
              },
            })}
          />
        </CreateProgramInternalDiv>
        <CreateProgramInternalDiv>
          <Img
            margin="auto"
            marginTop="1rem"
            marginBottom="1rem"
            w="50%"
            objectFit="cover"
            borderRadius="1rem"
            src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
          />
          <Textarea
            defaultValue={text}
            placeholder="프로그램 설명을 입력하세요"
            w="90%"
            border="none"
            bgColor={ThemeColor.backgroundColorDarker}
            marginBottom="1rem"
            {...register("programText", {
              onChange: () => {
                setText(watch("programText"));
              },
            })}
          />
        </CreateProgramInternalDiv>
        <CreateProgramInternalDiv>
          {(programType === "none" || programType === "daily") && (
            <TypeSelector />
          )}
          {programType === "weekly" && <WeeklyProgramBuilder />}
        </CreateProgramInternalDiv>
        <Flex justifyContent="center">
          <Button
            w="50%"
            marginTop="2rem"
            padding="2rem"
            isDisabled={!isProgramValid()}
            onClick={() => {
              mutate();
            }}
          >
            Work out!
          </Button>
        </Flex>
      </RoutinePanel>
    </BasicPageLayout>
  );
};
export default CreateProgram;

export const CreateProgramHeadDiv = styled.div`
  color: ${ThemeColor.topButtonColor};
  font-weight: bold;
  font-size: 2.5rem;
  padding: 1rem;
  border-bottom: 0.2rem solid ${ThemeColor.backgroundColorDarker};
`;

export const CreateProgramInternalDiv = styled.div<{ noBorder?: boolean }>`
  text-align: center;
  ${({ noBorder = false }) =>
    !noBorder &&
    `border-top: 0.2rem solid ${ThemeColor.backgroundColorDarker};`}
`;
