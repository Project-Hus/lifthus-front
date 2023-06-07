import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text, Spinner, Img } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import programApi from "../../../api/programApi";
import { ThemeColor } from "../../../common/styles/theme.style";
import useNewWeeklyProgramStore, {
  WeeklyRoutineAct,
} from "../../../store/createWeeklyProgram.zustand";

const InputButtonStyle = css`
  background-color: ${ThemeColor.backgroundColorDarker};
  border: 1px solid ${ThemeColor.backgroundColor};
  border-radius: 5px;
  font-size: 3vw;
  width: 3em;
  text-align: center;
  padding: 0.5em 0;
`;

const ActInfo = ({
  routineAct,
  isEditing,
}: {
  routineAct: WeeklyRoutineAct;
  isEditing: boolean;
}) => {
  const {
    newProgram,
    updateRoutineAct,
    removeRoutineAct,
    upRoutineAct,
    downRoutineAct,
  } = useNewWeeklyProgramStore();
  const { data: act, isLoading } = useQuery(
    ["act", { id: routineAct.act_id }],
    async () => {
      const act = await programApi.queryActById(routineAct.act_id);
      return act;
    }
  );
  routineAct =
    newProgram.routine_acts.find(
      (ra) =>
        ra.week === routineAct.week &&
        ra.day === routineAct.day &&
        ra.order === routineAct.order
    ) || routineAct;

  const { register, getValues, setValue } = useForm();

  if (act)
    return (
      <Box>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          fontSize="3vw"
        >
          <Img
            src={
              act.image ||
              "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
            }
            width="10%"
            alt="exercise"
          />
          <Text>{act?.name}</Text>

          {isEditing && (
            <Button
              bg={ThemeColor.backgroundColor}
              _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
              onClick={() => {
                removeRoutineAct(
                  routineAct.week,
                  routineAct.day,
                  routineAct.order
                );
              }}
            >
              <DeleteIcon />
            </Button>
          )}

          {!isEditing && act.type == "rep" && (
            <Flex alignItems={"center"}>
              <Flex alignItems={"center"}>
                <Input
                  css={InputButtonStyle}
                  type="number"
                  width="5em"
                  textAlign="center"
                  defaultValue={
                    routineAct.w_ratio ? routineAct.w_ratio * 100 : "..."
                  }
                  fontSize="3vw"
                  {...register("w_percentage", {
                    onChange: () => {
                      const w_percentage = getValues("w_percentage");
                      if (isNaN(w_percentage)) return;
                      const w_ratio = w_percentage / 100;
                      updateRoutineAct(
                        routineAct.week,
                        routineAct.day,
                        routineAct.order,
                        {
                          w_ratio,
                        }
                      );
                    },
                  })}
                />{" "}
                {"%"}
              </Flex>
              &nbsp;
              <Flex alignItems={"center"}>
                {"x"}
                <Input
                  css={InputButtonStyle}
                  width="5em"
                  type="number"
                  defaultValue={routineAct.reps}
                  fontSize="3vw"
                  {...register("reps", {
                    onChange: () => {
                      const reps = getValues("reps");
                      if (isNaN(reps)) return;
                      updateRoutineAct(
                        routineAct.week,
                        routineAct.day,
                        routineAct.order,
                        {
                          reps,
                        }
                      );
                    },
                  })}
                />
              </Flex>
            </Flex>
          )}
          {!isEditing && act.type == "lap" && (
            <Flex alignItems={"center"}>
              <Flex alignItems={"center"}>
                <Input
                  css={InputButtonStyle}
                  type="number"
                  width="5em"
                  textAlign="center"
                  defaultValue={60}
                  fontSize="3vw"
                ></Input>{" "}
                {"분"}
              </Flex>
              &nbsp;
              <Flex alignItems={"center"}>
                <Input
                  css={InputButtonStyle}
                  width="5em"
                  type="number"
                  defaultValue={routineAct.lap}
                  readOnly
                  fontSize="3vw"
                ></Input>
                {"초"}
              </Flex>
            </Flex>
          )}
          {!isEditing && act.type == "simple" && <></>}
          {!isEditing && (
            <Flex direction={"column"}>
              <Button
                onClick={() => {
                  upRoutineAct(
                    routineAct.week,
                    routineAct.day,
                    routineAct.order
                  );
                  if (routineAct.w_ratio && routineAct.reps) {
                    setValue("w_percentage", routineAct.w_ratio * 100);
                    setValue("reps", routineAct.reps);
                  }
                }}
                boxSize={"5vw"}
              >
                <TriangleUpIcon />
              </Button>
              <Button
                onClick={() => {
                  downRoutineAct(
                    routineAct.week,
                    routineAct.day,
                    routineAct.order
                  );
                  if (routineAct.w_ratio && routineAct.reps) {
                    setValue("w_percentage", routineAct.w_ratio * 100);
                    setValue("reps", routineAct.reps);
                  }
                }}
                boxSize={"5vw"}
              >
                <TriangleDownIcon />
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    );
  else return <Spinner />;
};
export default ActInfo;
