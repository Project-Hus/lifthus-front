import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text, Spinner, Img } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { co } from "@fullcalendar/core/internal-common";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import programApi from "../../../api/programApi";
import { ThemeColor } from "../../../common/styles/theme.style";
import useNewWeeklyProgramStore, {
  WeeklyRoutineAct,
} from "../../../store/createWeeklyProgram.zustand";

const InputButtonStyle = css`
  background-color: ${ThemeColor.backgroundColorDarker};
  border: none;
  font-size: 1em;
  width: 2.5em;
  text-align: center;
  padding: 0 0;
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

  const { register, getValues, setValue } = useForm({
    shouldUseNativeValidation: true,
  });
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
            width="5vw"
            alt="exercise"
          />
          <Text fontSize={"0.8em"}>&nbsp;{act?.name}</Text>

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
            <Flex alignItems={"center"} marginLeft="auto">
              <Flex alignItems={"center"}>
                <Input
                  css={InputButtonStyle}
                  type="number"
                  value={(routineAct.w_ratio || 0) * 100}
                  {...register("w_percentage", {
                    onChange: () => {
                      const w_percentageS = getValues("w_percentage");
                      let w_percentage = Number(w_percentageS);
                      if (isNaN(w_percentage)) return;
                      if (w_percentage > 100) {
                        w_percentage = 100;
                        setValue("w_percentage", 100);
                      } else if (w_percentage < 0) {
                        w_percentage = 0;
                        setValue("w_percentage", 0);
                      }
                      const w_ratio = w_percentage / 100;
                      setValue("w_percentage", w_percentage);
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
                />
                <Text>%</Text>
              </Flex>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Flex alignItems={"center"}>
                <Text>x</Text>
                <Input
                  css={InputButtonStyle}
                  type="number"
                  value={routineAct.reps}
                  {...register("reps", {
                    onChange: () => {
                      const repsS = getValues("reps");
                      let reps = Number(repsS);
                      if (isNaN(reps)) return;
                      if (reps > 9999) {
                        reps = 9999;
                        setValue("reps", 9999);
                      } else if (reps < 0) {
                        reps = 0;
                        setValue("reps", 0);
                      }
                      setValue("reps", reps);
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
            <Flex alignItems={"center"} marginLeft="auto">
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
                variant="ghost"
                _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
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
              >
                <TriangleUpIcon fontSize="2em" />
              </Button>
              <Button
                variant="ghost"
                _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}
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
              >
                <TriangleDownIcon fontSize="2em" />
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    );
  else return <Spinner />;
};
export default ActInfo;
