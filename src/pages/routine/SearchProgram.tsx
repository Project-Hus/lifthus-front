import { Img, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import CreateProgram, {
  CreateProgramHeadDiv,
  CreateProgramInternalDiv,
} from "./CreateProgram";
import { RoutinePanel } from "./Routine";

const SearchProgram = () => {
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
            {...register("programTitle", {
              onChange: () => {},
            })}
          />
        </CreateProgramInternalDiv>
        <CreateProgramInternalDiv></CreateProgramInternalDiv>
      </RoutinePanel>
    </BasicPageLayout>
  );
};
export default SearchProgram;

const SearchedProgram = () => {
  return <div>sp</div>;
};
