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
import { ChangeEvent, useState } from "react";
import { BaisPageLayoutNoMargin } from "../../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../../common/styles/theme.style";
import { useForm, FormProvider } from "react-hook-form";
import useNewWeeklyProgramStore from "../../../store/createWeeklyProgram.zustand";

import WeekProgramForm from "./unitProgramForm";

const CreateProgram = () => {
  const hookForm = useForm();
  const { newProgram, updateProgram, addTag, removeTag, addWeeklyRoutine } =
    useNewWeeklyProgramStore();

  const onSubmit = (data: any) => {
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

  return (
    <BaisPageLayoutNoMargin>
      <FormProvider {...hookForm}>
        <form onSubmit={hookForm.handleSubmit(onSubmit)}>
          <div>
            <Flex direction={"column"}>
              <FormLabel
                textAlign="center"
                htmlFor="name"
                fontSize="5vw"
                fontWeight={"bold"}
              >
                프로그램 이름
              </FormLabel>

              <Input
                paddingY="1em"
                alignSelf={"center"}
                width="50vw"
                fontSize="4vw"
                textAlign="end"
                bg={ThemeColor.backgroundColorDarker}
                id="name"
                type="text"
                defaultValue={newProgram.title}
                {...hookForm.register("title", {
                  onChange: (e) => {
                    updateProgram({ title: hookForm.getValues("title") });
                  },
                })}
              />
            </Flex>
          </div>
          <div>
            <FormLabel htmlFor="file" margin="0">
              <Box
                _hover={{ background: ThemeColor.backgroundColorDarker }}
                marginY="0.5em"
                borderRadius="8%"
              >
                <Flex direction={"column"} alignItems="center" fontSize="4vw">
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
                    <PlusSquareIcon boxSize={"7vw"} />
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
              {...hookForm.register("image", {
                onChange: handleImageChange,
              })}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "5vw",
            }}
          >
            <Text fontWeight="bold" fontSize="3vw" textAlign={"center"}>
              태그
            </Text>

            <Input
              width="50%"
              fontSize="0.5em"
              textAlign={"center"}
              placeholder="관련 태그를 입력해주세요"
              {...hookForm.register("tag", {
                onChange: (e) => {
                  // 태그 자동 인식 및 검색으로 나중에 전환
                },
              })}
            />
            <Flex justifyContent={"center"}>
              <Button
                paddingY="0.3em"
                boxSize="object-fit"
                onClick={() => {
                  addTag(hookForm.getValues("tag"));
                  hookForm.setValue("tag", "");
                }}
              >
                <Text fontSize="3vw">태그 추가</Text>
              </Button>
              <Button
                boxSize="object-fit"
                paddingY="0.3em"
                onClick={() => {
                  removeTag(hookForm.getValues("tag"));
                  hookForm.setValue("tag", "");
                }}
              >
                <Text fontSize="3vw">태그 삭제</Text>
              </Button>
            </Flex>
            {newProgram.tags.map((tag, index) => {
              return (
                <div>
                  <Text key={index}>{"#" + tag}</Text>
                </div>
              );
            })}
          </div>

          <div>
            <Text textAlign={"center"}>설명</Text>
            <Textarea
              bg={ThemeColor.backgroundColorDarker}
              {...hookForm.register("description", {
                onChange: () => {
                  updateProgram({
                    description: hookForm.getValues("description"),
                  });
                },
              })}
              required
              fontWeight="bold"
              placeholder="설명을 입력하세요"
              defaultValue={newProgram.description}
            />
          </div>
          <div>
            {/* Showing each week */}
            {newProgram.weekly_routines.map((wr, index) => {
              return <WeekProgramForm key={index} weeklyRoutine={wr} />;
            })}
          </div>
          <Flex marginTop="0.1em">
            {!newProgram.weekly_routines.length && (
              <Button
                border="2px"
                bg={ThemeColor.backgroundColor}
                color={ThemeColor.backgroundColorDarker}
                flex={1}
                onClick={() => alert("🚧 Passionately building 🚧")}
              >
                <Text color="green">+Day</Text>
              </Button>
            )}
            {!(
              !newProgram.weekly_routines.length &&
              newProgram.daily_routines.length
            ) && (
              <Button
                border="2px"
                bg={ThemeColor.backgroundColor}
                color={ThemeColor.backgroundColorDarker}
                flex={1}
                type="button"
                onClick={() => addWeeklyRoutine()}
              >
                <Text color={ThemeColor.basicColor}>+Week</Text>
              </Button>
            )}
          </Flex>

          {!!newProgram.weekly_routines.length && (
            <Button type="submit">Work Out!</Button>
          )}
        </form>
      </FormProvider>
    </BaisPageLayoutNoMargin>
  );
};

export default CreateProgram;
