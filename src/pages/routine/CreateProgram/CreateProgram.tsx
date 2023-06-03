import { DeleteIcon, TriangleDownIcon } from "@chakra-ui/icons";
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
          onClick={() =>
            setProgramPlanInfo({
              weeks: [...program.weeks, program.weeks.length + 1],
            })
          }
        >
          Week+
        </Button>
        <Button>Day+</Button>
      </div>
      <div>
        {program.weeks.map((idx) => {
          return (
            <>
              <WeekProgramForm key={idx + "1"} idx={idx} />
            </>
          );
        })}
      </div>

      {fields.length > 0 && <Button>Work Out!</Button>}
    </>
  );
};

export default CreateProgram;
