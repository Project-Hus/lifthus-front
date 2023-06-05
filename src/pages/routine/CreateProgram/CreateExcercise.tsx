import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Radio,
  Checkbox,
  Box,
  Img,
  Text,
  RadioGroup,
  CheckboxGroup,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { ChangeEvent, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../../common/styles/theme.style";
import WeekProgramForm from "./unitProgramForm";

const CreateExcercise = () => {
  const navigate = useNavigate();
  const goToCreateProgram = () => {
    navigate("/routine/menu/createprogram");
  };
  const [routineList, setRoutineList] = useState<string[]>([]);

  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    // 입력된 데이터 처리
    console.log(data);
  };

  const titlestyle = css`
    flex-grow: 1;
    font-size: 6vw;
    font-weight: bold;
    color: ${ThemeColor.basicColor};
  `;
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
  //태그 관련 state
  const [tagvalue, setagValue] = useState<string[]>([]);
  const [inputvalue, setInputValue] = useState<string>("");

  return (
    <BasicPageLayout>
      <Box as="span" css={titlestyle}>
        새 프로그램 생성
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormLabel htmlFor="name">동작 이름</FormLabel>
          <Input id="name" type="text" {...register("name")} />
        </div>
        {/* 이미지 첨부 및 미리보기 화면 */}
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
          <Button onClick={() => setagValue([...tagvalue, inputvalue])}>
            태그 추가
          </Button>
          <Button onClick={() => setagValue([])}>태그 리셋</Button>
          {tagvalue.map((tag, index) => {
            return (
              <div>
                <Text key={index}>{tag}</Text>
              </div>
            );
          })}
        </div>
        <Input
          hidden
          id="file"
          type="file"
          accept="image/*"
          {...register("photo")}
          onChange={handleImageChange}
        />
        {/* make radio type input buttons for select excercise type  */}
        <div>
          <FormLabel textAlign={"center"}>동작 타입:</FormLabel>
          <RadioGroup fontSize={"sm"} textAlign="center">
            <Radio id="strength" value="strength" {...register("type")} />
            <label htmlFor="strength">근력</label>
            <Radio id="stretch" value="stretch" {...register("type")} />
            <label htmlFor="stretch">스트레칭</label>
            <Radio id="cardio" value="cardio" {...register("type")} />
            <label htmlFor="cardio">유산소</label>
            <Radio id="others" value="others" {...register("type")} />
            <label htmlFor="others">기타</label>
          </RadioGroup>
        </div>
        {/* make select input for select target part of body */}
        <div>
          <FormLabel textAlign="center" htmlFor="target">
            운동부위:
          </FormLabel>
          <Box
            fontSize={"sm"}
            textAlign="center"
            justifyContent={"space-around"}
          >
            <CheckboxGroup>
              <Checkbox id="upperbody" {...register("upperbody")} />
              <label htmlFor="upperbody">상체</label>
              <Checkbox id="downbody" {...register("downbody")} />
              <label htmlFor="downbody">하체</label>
              <Checkbox id="otherbody" {...register("otherbody")} />
              <label htmlFor="otherbody">기타</label>
            </CheckboxGroup>
          </Box>
        </div>
        <div>
          <label>설명:</label>
          <Textarea
            placeholder="설명을 작성해주세요"
            {...register("description")}
            required
          />
        </div>
        <Flex>
          <Button flex={1} onClick={goToCreateProgram}>
            취소
          </Button>
          <Button flex={1} type="submit">
            생성
          </Button>
        </Flex>
      </form>
    </BasicPageLayout>
  );
};
export default CreateExcercise;
