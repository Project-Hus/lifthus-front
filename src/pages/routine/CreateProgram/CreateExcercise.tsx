import {
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Radio,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import WeekProgramForm from "../unitProgramForm";

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weeks",
  });
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormLabel htmlFor="name">동작 이름</FormLabel>
          <Input id="name" type="text" {...register("name")} />
        </div>
        <div>
          <FormLabel htmlFor="file">사진:</FormLabel>
          <Input id="file" type="file" {...register("photo")} />
        </div>
        {/* make radio type input buttons for select excercise type  */}
        <div>
          <label>동작 타입:</label>
          <Radio id="strength" {...register("strength")} />
          <label htmlFor="strength">근력</label>
          <Radio id="stretch" {...register("stretch")} />
          <label htmlFor="stretch">스트레칭</label>
          <Radio id="cardio" {...register("cardio")} />
          <label htmlFor="cardio">유산소</label>
          <Radio id="others" {...register("others")} />
          <label htmlFor="others">기타</label>
        </div>
        {/* make select input for select target part of body */}
        <div>
          <FormLabel htmlFor="target">운동부위:</FormLabel>
          <Checkbox id="stretch" {...register("stretch")} />
          <label htmlFor="stretch">상체</label>
          <Checkbox id="cardio" {...register("cardio")} />
          <label htmlFor="cardio">하체</label>
          <Checkbox id="others" {...register("others")} />
          <label htmlFor="others">기타</label>
        </div>

        <div>
          <label>설명:</label>
          <Textarea
            placeholder="설명을 작성해주세요"
            {...register("description")}
            required
          />
        </div>
      </form>

      <Button onClick={goToCreateProgram}>돌아가기</Button>
      <Button>생성</Button>
    </>
  );
};
export default CreateExcercise;
