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
import { ChangeEvent, useEffect, useState } from "react";
import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../../common/styles/theme.style";
import { week } from "../../../store/interfaces/program.interface";
import { useProgramPlanStore } from "../../../store/program.zustand";
import WeekProgramForm from "../unitProgramForm";
import {
  useFieldArray,
  useForm,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const CreateProgram = () => {
  const { program, setProgramPlanInfo, resetProgramPlanInfo } =
    useProgramPlanStore();

  useEffect(() => {
    console.log("weeks", program.weeks);
  });
  //일정을 담는 리스트

  const methods = useForm();

  const onSubmit = (data: any) => {
    // 입력된 데이터 처리
    console.log(data);
  };

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

  useEffect(() => {
    console.log("weeks", program.weeks);
  }, [program.weeks]);

  const addweeks = () => {
    const temp =
      program.weeks.length == 0
        ? 0
        : program.weeks[program.weeks.length - 1].weeknum + 1;
    setProgramPlanInfo({
      weeks: [...program.weeks, { weeknum: temp }],
    });
  };

  return (
    <BasicPageLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            <FormLabel textAlign="center" htmlFor="name">
              프로그램 이름
            </FormLabel>

            <Input id="name" type="text" {...methods.register("name")} />
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
                    {selectedImage
                      ? "이미지 변경하기"
                      : "이미지를 첨부해주세요"}
                  </Text>
                </Flex>
              </Box>
            </FormLabel>

            <Input
              hidden
              id="file"
              type="file"
              accept="image/*"
              {...methods.register("photo")}
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
              {...methods.register("description")}
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
            onClick={
              () => addweeks()
              // setProgramPlanInfo({
              //   weeks: [
              //     ...program.weeks,
              //     //weeknum을 기존 weeks의 마지막weeknum 값+1
              //     {
              //       weeknum:
              //         program.weeks.length == 0
              //           ? 0
              //           : program.weeks[program.weeks.length - 1].weeknum + 1,
              //     },
              //   ],
              // })
            }
          >
            <Text color={ThemeColor.basicColor}>Week+</Text>
          </Button>
        </Flex>
        <div>
          {program.weeks.map((week, index) => {
            return (
              <WeekProgramForm
                key={index}
                week={week.weeknum}
                idx={index + 1}
              />
            );
          })}
        </div>

        {<Button>Work Out!</Button>}
      </FormProvider>
    </BasicPageLayout>
  );
};

export default CreateProgram;
