import { Button, Img, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import {
  CreateProgramHeadDiv,
  CreateProgramInternalDiv,
} from "./CreateProgram";
import { RoutinePanel } from "./Routine";

const CreateAct = () => {
  const { register, handleSubmit, watch } = useForm();
  return (
    <BasicPageLayout>
      <RoutinePanel>
        <CreateProgramHeadDiv>새 동작 생성</CreateProgramHeadDiv>
        <CreateProgramInternalDiv noBorder={true}>
          <Text fontWeight="bold" marginTop="1rem">
            동작 이름
          </Text>
          <Input
            border="none"
            bgColor={ThemeColor.backgroundColorDarker}
            w="70%"
            margin="1rem"
            textAlign={"center"}
            fontSize="1.5rem"
            {...register("actName")}
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
            placeholder="동작 설명을 입력하세요"
            w="90%"
            border="none"
            bgColor={ThemeColor.backgroundColorDarker}
            marginBottom="1rem"
            {...register("actText")}
          />
        </CreateProgramInternalDiv>
        <Button>asdf</Button>
        <Button>asdf</Button>
      </RoutinePanel>
    </BasicPageLayout>
  );
};

export default CreateAct;
