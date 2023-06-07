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
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CreateActDto } from "../../../api/dtos/program/act.dto";
import programApi from "../../../api/programApi";
import BasicPageLayout from "../../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../../common/styles/theme.style";
import useUserStore from "../../../store/user.zustand";
import WeekProgramForm from "./unitProgramForm";

const CreateExcercise = () => {
  const ActpartList = {
    weight: true,
    bodyweight: true,
    cardio: true,
    upper: true,
    lower: true,
    arms: true,
    shoulders: true,
    chest: true,
    core: true,
    upper_back: true,
    lower_back: true,
    glute: true,
    legs_front: true,
    legs_back: true,
    etc: true,
  };

  const navigate = useNavigate();
  const goToCreateProgram = () => {
    navigate("/routine/menu/createprogram");
  };

  const InputButtonStyle = css`
    background-color: ${ThemeColor.backgroundColorDarker};
    border: 1px solid ${ThemeColor.backgroundColor};
    padding: 1em 1em;
  `;

  const Checkboxstyle = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  `;

  const [routineList, setRoutineList] = useState<string[]>([]);

  const { register, handleSubmit, getValues } = useForm();

  const { uid } = useUserStore();
  const onSubmit = async (data: any) => {
    const newAct: CreateActDto = {
      name: getValues("name"),
      type: getValues("type"),
      author: uid,
      description: getValues("description"),
      tags: [],
      weight: getValues("weight"),
      bodyweight: getValues("bodyweight"),
      cardio: getValues("cardio"),
      upper: getValues("upper"),
      lower: getValues("lower"),
      full: getValues("full"),
      arms: getValues("arms"),
      shoulders: getValues("shoulders"),
      chest: getValues("chest"),
      core: getValues("core"),
      upper_back: getValues("upper_back"),
      lower_back: getValues("lower_back"),
      glute: getValues("glute"),
      legs_front: getValues("legs_front"),
      legs_back: getValues("legs_back"),
      etc: getValues("etc"),
    };
    programApi
      .createAct(newAct)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => alert("동작 생성에 실패했습니다."));
  };

  const titlestyle = css`
    flex-grow: 1;
    font-size: 6vw;
    font-weight: bold;
    color: ${ThemeColor.basicColor};
    padding: 0.5em 0;
    border-bottom: 2px solid ${ThemeColor.backgroundColorDarker};
    border-top: 2px solid ${ThemeColor.backgroundColorDarker};
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
      <Box css={titlestyle}>새 동작 생성</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          borderBottom={`3px solid ${ThemeColor.backgroundColorDarker}`}
          paddingY="0.6em"
        >
          <FormLabel
            padding="5%"
            fontWeight="bold"
            textAlign="center"
            htmlFor="name"
            fontSize="4vw"
            margin="0"
          >
            동작 이름
          </FormLabel>
          <Input
            css={InputButtonStyle}
            textAlign="center"
            id="name"
            type="text"
            fontSize="5vw"
            fontWeight="bold"
            {...register("name")}
            placeholder="이름을 입력해주세요"
          />
        </Box>
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
                <PlusSquareIcon boxSize={"7vw"} />
              )}

              <Text fontSize="5vw">
                {selectedImage ? "이미지 변경하기" : "이미지를 첨부해주세요"}
              </Text>
            </Flex>
          </Box>
        </FormLabel>
        <div
          style={{
            textAlign: "center",
            fontSize: "5vw",
          }}
        >
          {/*
          <Text fontWeight="bold" fontSize="3vw" textAlign={"center"}>태그</Text>

          <Input
            css={InputButtonStyle}
            width="70%"
            name="tag"
            fontSize="0.5em"
            textAlign={"center"}
            placeholder="추가할 관련 태그를 입력"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Flex justifyContent={"center"}>
            <Button paddingY="0.3em"
              boxSize="object-fit" onClick={() => setagValue([...tagvalue, inputvalue])}>
              <Text fontSize="3vw">태그 추가</Text>
            </Button>
            <Button
              boxSize="object-fit"
              paddingY="0.3em"
              onClick={() => setagValue([])}>
              <Text fontSize="3vw">태그 리셋</Text>
            </Button>
          </Flex>
          */}
          {tagvalue.map((tag, index) => {
            return (
              <div>
                <Text key={index}>{"#" + tag}</Text>
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
        <Box
          border={`2px solid ${ThemeColor.backgroundColorDarker}`}
          fontSize="3vw"
        >
          <FormLabel margin="0" textAlign={"center"} fontSize="3vw">
            동작 타입
          </FormLabel>
          <RadioGroup fontSize="1em" textAlign="center">
            <Radio id="repeat" value="rep" {...register("type")} />
            <label htmlFor="repeat">반복</label>
            &nbsp;
            <Radio id="time" value="lap" {...register("type")} />
            <label htmlFor="time">시간</label>
            &nbsp;
            <Radio id="simple" value="simple" {...register("type")} />
            <label htmlFor="simple">단순</label>
          </RadioGroup>
        </Box>
        {/* make select input for select target part of body */}
        <Box
          border={`2px solid ${ThemeColor.backgroundColorDarker}`}
          marginBottom="1em"
        >
          <FormLabel
            textAlign="center"
            htmlFor="target"
            fontSize="1em"
            margin="0"
          >
            운동부위
          </FormLabel>
          <Box
            fontSize="1em"
            textAlign="center"
            justifyContent={"space-around"}
          >
            <CheckboxGroup>
              <Flex justifyContent={"center"}>
                <Checkboxstyle>
                  {Object.keys(ActpartList).map((part, index) => {
                    return (
                      <div key={index}>
                        <Flex direction="column" alignItems={"center"}>
                          <Checkbox id={part} {...register(part)} />
                          <FormLabel
                            margin="0"
                            textAlign="center"
                            fontSize={"0.5em"}
                            htmlFor={part}
                          >
                            {part}
                          </FormLabel>
                        </Flex>
                      </div>
                    );
                  })}
                </Checkboxstyle>
              </Flex>
            </CheckboxGroup>
          </Box>
        </Box>
        <div>
          <Textarea
            css={InputButtonStyle}
            placeholder="설명을 작성해주세요"
            {...register("description")}
            required
          />
        </div>
        <Flex marginY="0.5em">
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
