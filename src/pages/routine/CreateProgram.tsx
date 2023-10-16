import { Img, Input, Text, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useForm } from "react-hook-form";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import TypeSelector from "../../components/routine/createProgram/CreateProgramTypeSelector";
import WeeklyProgramBuilder from "../../components/routine/createProgram/WeeklyProgramBuilder";
import useProgramCreationStore from "../../store/createProgram.zustand";
import { RoutinePanel } from "./Routine";

const CreateProgram = () => {
  const { programType } = useProgramCreationStore();

  const { register, handleSubmit, watch } = useForm();

  return (
    <BasicPageLayout>
      <RoutinePanel>
        <CreateProgramHeadDiv>새 프로그램 생성</CreateProgramHeadDiv>
        <CreateProgramInternalDiv noBorder={true}>
          <Text fontWeight="bold" marginTop="1rem">
            프로그램 이름
          </Text>
          <Input
            border="none"
            bgColor={ThemeColor.backgroundColorDarker}
            w="70%"
            margin="1rem"
            textAlign={"center"}
            fontSize="1.5rem"
            {...register("programTitle")}
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
            placeholder="프로그램 설명을 입력하세요"
            w="90%"
            border="none"
            bgColor={ThemeColor.backgroundColorDarker}
            marginBottom="1rem"
            {...register("programText")}
          />
        </CreateProgramInternalDiv>
        <CreateProgramInternalDiv>
          {(programType === "none" || programType === "daily") && (
            <TypeSelector />
          )}
          {programType === "weekly" && <WeeklyProgramBuilder />}
        </CreateProgramInternalDiv>
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
