import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import WeekProgramForm from "../unitProgramForm";

const CreateProgram = () => {
  //일정을 담는 리스트
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

  const [weekList, setweekList] = useState<number[]>([]);
  let countweek = 1;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormLabel htmlFor="name">이름</FormLabel>
          <Input id="name" type="text" {...register("name")} />
        </div>
        <div>
          <FormLabel htmlFor="file">사진:</FormLabel>
          <Input id="file" type="file" {...register("photo")} />
        </div>

        <div>
          <label>설명:</label>
          <Textarea {...register("description")} required />
          <span>설명을 입력하세요.</span>
        </div>
      </form>
      <div>
        <Button
          type="button"
          onClick={() => setweekList([...weekList, weekList.length + 1])}
        >
          Week+
        </Button>
        <Button>Day+</Button>
      </div>
      <div>
        {weekList.map((week: number, idx) => {
          return <WeekProgramForm key={idx} week={week} />;
        })}

        <Flex direction="column">
          <>
            <input
              type="text"
              placeholder={`${1}주차 내용`}
              {...register(`weeks.content` as const)}
            />
          </>
        </Flex>

        <Button type="button" onClick={() => remove()}>
          삭제
        </Button>
      </div>

      {fields.length > 0 && <Button>Work Out!</Button>}
    </>
  );
};

export default CreateProgram;
