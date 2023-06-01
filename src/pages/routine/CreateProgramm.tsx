import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const CreateProgramm = () => {
    //일정을 담는 리스트
    const [routineList, setRoutineList] = useState<string[]>([]);

    const { register, handleSubmit, control } = useForm();

    const onSubmit = (data: any) => {
        // 입력된 데이터 처리
        console.log(data);
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'weeks',
    });
    const days = ["월", "화", "수", "목", "금", "토", "일"]
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <FormLabel htmlFor="name">이름</FormLabel>
                <Input id="name" type="text"  {...register("name")} />
            </div>
            <div>
                <FormLabel htmlFor="file">사진:</FormLabel>
                <Input id="file" type="file"  {...register("photo")} />
            </div>

            <div>
                <label>설명:</label>
                <Textarea  {...register("description")} required />
                <span>설명을 입력하세요.</span>
            </div>
            <div>
                <Button type="button" onClick={() => append({ content: '' })}>
                    Week+
                </Button>
                <Button>Day+</Button>

            </div>
            {days.slice(0, 5).map((day, index) => (
                <>
                    <Box>{day}</Box>
                </>
            )
            )
            }
            <div>
                <Box><TriangleDownIcon transform={"rotate(270deg)"} />{1 + "주차"}</Box>
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


            {fields.length > 0 && <Button>
                Work Out!
            </Button>}

        </form>
    );
}

export default CreateProgramm;