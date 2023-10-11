import { Img, Input, Text, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateDailyRoutineDto } from "../../api/dtos/program.dto";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import TypeSelector from "../../components/routine/createProgram/CreateProgramTypeSelector";
import WeeklyProgramBuilder from "../../components/routine/createProgram/WeeklyProgramBuilder";
import { RoutinePanel } from "./Routine";

const CreateProgram = () => {
  const [programType, setProgramType] = useState<"none" | "weekly" | "daily">(
    "none"
  );
  const [dailyRoutines, setDailyRoutines] = useState<CreateDailyRoutineDto[]>(
    []
  );

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
            src="https://media.tenor.com/t3buP-QoO9oAAAAM/jim-carrey-work.gif"
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
            <TypeSelector typeSetter={setProgramType} />
          )}
          {programType === "weekly" && (
            <WeeklyProgramBuilder
              typeResetter={() => {
                setProgramType("none");
              }}
              dailyRoutines={dailyRoutines}
              dailyRoutineSetter={setDailyRoutines}
            />
          )}
        </CreateProgramInternalDiv>
      </RoutinePanel>
    </BasicPageLayout>
  );
};
export default CreateProgram;

const CreateProgramHeadDiv = styled.div`
  color: ${ThemeColor.topButtonColor};
  font-weight: bold;
  font-size: 2.5rem;
  padding: 1rem;
  border-bottom: 0.2rem solid ${ThemeColor.backgroundColorDarker};
`;

const CreateProgramInternalDiv = styled.div<{ noBorder?: boolean }>`
  text-align: center;
  ${({ noBorder = false }) =>
    !noBorder &&
    `border-top: 0.2rem solid ${ThemeColor.backgroundColorDarker};`}
`;
