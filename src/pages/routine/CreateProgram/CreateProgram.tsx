import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Img,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../../common/styles/theme.style";
import { useProgramPlanStore } from "../../../store/program.zustand";
import WeekProgramForm from "./unitProgramForm";
import { useForm, FormProvider } from "react-hook-form";

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
  useEffect(() => {
    console.log("days", program.days);
  }, [program.days]);

  const addweeks = () => {
    const temp =
      program.weeks.length == 0
        ? 0
        : program.weeks[program.weeks.length - 1].weeknum + 1;
    setProgramPlanInfo({
      weeks: [...program.weeks, { weeknum: temp }],
      days: [
        ...program.days,

        {
          week: temp,
          dayNum: 1,
        },
        {
          week: temp,
          dayNum: 2,
        },
        {
          week: temp,
          dayNum: 3,
        },
        {
          week: temp,
          dayNum: 4,
        },
        {
          week: temp,
          dayNum: 5,
        },
        {
          week: temp,
          dayNum: 6,
        },
        {
          week: temp,
          dayNum: 7,
        },
      ],
    });
  };
  const [inputvalue, setInputValue] = useState<string>("");

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
          <div style={{ textAlign: "center" }}>
            <Text textAlign={"center"}>태그</Text>

            <Input
              width="30%"
              name="tag"
              textAlign={"center"}
              placeholder="관련 태그를 입력해주세요"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <Button
              onClick={() =>
                setProgramPlanInfo({ tag: [...program.tag, inputvalue] })
              }
            >
              태그 추가
            </Button>
            <Button onClick={() => setProgramPlanInfo({ tag: [] })}>
              태그 리셋
            </Button>
            {program.tag.map((tag, index) => {
              return (
                <div>
                  <Text key={index}>{tag}</Text>
                </div>
              );
            })}
          </div>

          <div>
            <Text textAlign={"center"}>설명</Text>
            <Textarea
              {...methods.register("description")}
              required
              placeholder="설명을 입력하세요"
            />
          </div>

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
          <Flex>
            <Button
              border="2px"
              bg={ThemeColor.backgroundColor}
              color={ThemeColor.backgroundColorDarker}
              flex={1}
              onClick={() => alert("🚧 Passionately building 🚧")}
            >
              <Text color="green">Day+</Text>
            </Button>
            <Button
              border="2px"
              bg={ThemeColor.backgroundColor}
              color={ThemeColor.backgroundColorDarker}
              flex={1}
              type="button"
              onClick={() => addweeks()}
            >
              <Text color={ThemeColor.basicColor}>Week+</Text>
            </Button>
          </Flex>
          {<Button type="submit">Work Out!</Button>}
        </form>
      </FormProvider>
    </BasicPageLayout>
  );
};

export default CreateProgram;
