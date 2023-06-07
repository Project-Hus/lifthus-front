import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Box,
  Stack,
} from "@chakra-ui/react";
import SelectProgram from "./SelectProgram";
import { ThemeColor } from "../../common/styles/theme.style";
import { css } from "@emotion/react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateProgram from "./CreateProgram/CreateProgram";
import { useProgramPlanStore } from "../../store/program.zustand";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";

const RoutineMenu = () => {
  //버튼의 선택 상태를 관리하는 state 및 함수
  const [selectedButton, setSelectedButton] = useState<string>("none");
  useEffect(() => {
    console.log("RoutineMenu", selectedButton);
  }, [selectedButton]);
  const handleButtonClick = (buttonId: string) => {
    if (selectedButton === buttonId) {
      setSelectedButton("none"); // 같은 버튼을 클릭하면 선택 해제
    } else {
      setSelectedButton(buttonId); // 다른 버튼을 클릭하면 선택
    }
  };
  // 선택한 버튼과 동일하면 색상 반환하는 함수
  const changeButtonColor = (buttonId: string) => {
    // 선택한 버튼에 따라 색상 스키마 지정
    if (selectedButton === buttonId) {
      return ThemeColor.basicColor; // 선택된 버튼의 글자 색상을 파란색으로 지정
    }

    return "white"; // 선택되지 않은 버튼의 글자 색상을 흰색으로 지정
  };
  const backbuttonstyle = css`
    background-color: ${ThemeColor.backgroundColor};
    float: right;
    font-size: 4vw;
    margin-bottom: 2rem;
    :hover {
      background-color: ${ThemeColor.backgroundColor};
    }
  `;
  const titlestyle = css`
    text-align: start;
    flex-grow: 1;
    font-size: 6vw;
  `;

  const buttonstyle = css`
    padding-top: 5rem;
    padding-bottom: 5rem;
    height: 3rem;
    width: 100%;
    align-items: center;
    background-color: ${ThemeColor.backgroundColor};
    border-bottom: 2px solid ${ThemeColor.backgroundColorDarker};
    :hover {
      background-color: ${ThemeColor.backgroundColorDarker};
    }
    //기본 아코디언 버튼 스타일 제거
    svg {
      display: none;
    }
  `;
  const StackStyle = css`
    border-bottom: 2px solid ${ThemeColor.backgroundColorDarker};
    border-top: 4px solid ${ThemeColor.backgroundColorDarker};
  `;

  const { resetProgramPlanInfo } = useProgramPlanStore();
  return (
    <>
      <BasicPageLayout>
        <Box>
          <Stack direction="column" css={StackStyle}>
            {(selectedButton == "none" || selectedButton == "button1") && (
              <Button
                color={changeButtonColor("button1")}
                css={buttonstyle}
                onClick={() => handleButtonClick("button1")}
              >
                <Box css={titlestyle}>프로그램 검색</Box>
              </Button>
            )}
            {(selectedButton == "none" || selectedButton == "button2") && (
              <Button
                color={changeButtonColor("button2")}
                css={buttonstyle}
                onClick={() => handleButtonClick("button2")}
              >
                <Box as="span" css={titlestyle}>
                  임시 루틴
                </Box>
              </Button>
            )}
            {(selectedButton == "none" || selectedButton == "button3") && (
              <Button
                color={changeButtonColor("button2")}
                css={buttonstyle}
                onClick={() => handleButtonClick("button3")}
              >
                <Box as="span" css={titlestyle}>
                  기록 하기
                </Box>
              </Button>
            )}
            {(selectedButton == "none" || selectedButton == "button4") && (
              <Button
                color={changeButtonColor("button4")}
                css={buttonstyle}
                onClick={() => handleButtonClick("button4")}
              >
                <Box as="span" css={titlestyle}>
                  새 프로그램 생성
                </Box>
              </Button>
            )}
          </Stack>
        </Box>
        {selectedButton && (
          <Box p={4}>
            {selectedButton === "button1" && <SelectProgram />}
            {selectedButton === "button4" && <CreateProgram />}
          </Box>
        )}

        <NavLink to="/routine">
          <Button onClick={resetProgramPlanInfo} css={backbuttonstyle}>
            뒤로 가기
          </Button>
        </NavLink>
      </BasicPageLayout>
    </>
  );
};
export default RoutineMenu;
