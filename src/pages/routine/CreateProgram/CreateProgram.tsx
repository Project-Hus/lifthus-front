import { DeleteIcon, PlusSquareIcon, TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormLabel,
  Img,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../../common/styles/theme.style";
import { week } from "../../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../../store/program.zustand";
import WeekProgramForm from "../unitProgramForm";

const CreateProgram = () => {
  const { program, setProgramPlanInfo } = useProgramPlanStore();

  //일정을 담는 리스트

  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    // 입력된 데이터 처리
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weeks",
  });

  //이미지 미리보기
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <BasicPageLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormLabel textAlign="center" htmlFor="name">
            프로그램 이름
          </FormLabel>

          <Input id="name" type="text" {...register("name")} />
        </div>
        <div>
          <FormLabel htmlFor="file">
            <Box
              _hover={{ background: ThemeColor.backgroundColorDarker }}
              marginY="0.5em"
              borderRadius="8%"
            >
              <Flex direction={"column"} alignItems="center">
                {selectedImage ? (
                  <Img
                    maxWidth="70%"
                    maxHeight="70%"
                    marginY="0.5em"
                    borderRadius="8%"
                    src={selectedImage}
                    alt="Preview"
                    objectFit="cover"
                  />
                ) : (
                  <PlusSquareIcon boxSize={"10"} />
                )}

                <Text>
                  {selectedImage ? "이미지 변경하기" : "이미지를 첨부해주세요"}
                </Text>
              </Flex>
            </Box>
          </FormLabel>

          <Input
            hidden
            id="file"
            type="file"
            accept="image/*"
            {...register("photo")}
            onChange={handleImageChange}
          />
        </div>
        <div>
          <Text textAlign={"center"}>태그</Text>
        </div>
        <div>
          <Box textAlign={"center"}>
            <RadioGroup>
              <Radio>반복</Radio>
              <Radio>시간</Radio>
              <Radio>단순</Radio>
            </RadioGroup>
          </Box>
        </div>
        <div>
          <Box textAlign={"center"}>
            <CheckboxGroup>
              <Checkbox>상체</Checkbox>
              <Checkbox>하체</Checkbox>
              <Checkbox>기타</Checkbox>
            </CheckboxGroup>
          </Box>
        </div>
        <div>
          <Text textAlign={"center"}>설명</Text>
          <Textarea
            {...register("description")}
            required
            placeholder="설명을 입력하세요"
          />
        </div>
      </form>
      <Flex>
        <Button
          border="2px"
          bg={ThemeColor.backgroundColor}
          color={ThemeColor.backgroundColorDarker}
          flex={1}
        >
          <Text color="green">Day+</Text>
        </Button>
        <Button
          border="2px"
          bg={ThemeColor.backgroundColor}
          color={ThemeColor.backgroundColorDarker}
          flex={1}
          type="button"
          onClick={() =>
            setProgramPlanInfo({
              weeks: [...program.weeks, program.weeks.length + 1],
            })
          }
        >
          <Text color={ThemeColor.basicColor}>Week+</Text>
        </Button>
      </Flex>
      <div>
        {program.weeks.map((week) => {
          return (
            <>
              <WeekProgramForm key={week} week={week} />
            </>
          );
        })}
      </div>

      {fields.length > 0 && <Button>Work Out!</Button>}
    </BasicPageLayout>
  );
};

export default CreateProgram;
