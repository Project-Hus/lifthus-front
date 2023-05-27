import React from "react";
import TodaysRoutine from "./TodaysRoutine/TodaysRoutine";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react'
import SelectRoutine from "./SelectRoutine";
import { ThemeColor } from "../../common/styles/theme.style";
import { css } from "@emotion/react";
import { Text } from '@chakra-ui/react'
const backbuttonstyle = css`
  background-color: ${ThemeColor.backgroundColor};
  float: right;
  font-size : 4vw;
  :hover {
    background-color: ${ThemeColor.backgroundColor};
  }

`
const titlestyle = css`
  flex-grow: 1;
  font-size : 6vw
`

const buttonstyle = css`

  svg { display : none; }

  & :hover { background-color: ${ThemeColor.backgroundColorDarker} };

`

const Routine = () => {
  return (
    <div style={{ margin: "5em" }}>
      <TodaysRoutine />
      <Accordion allowMultiple={true} >

        <AccordionItem border="none">
          <h2 >
            <AccordionButton width="80vw" alignItems="center" css={buttonstyle}>

              <Box as="span" css={titlestyle} >
                프로그램 선택
              </Box>
              <AccordionIcon />

            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign={"center"}>
            <SelectRoutine />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none" >
          <h2>
            <AccordionButton css={buttonstyle}>
              <Box as="span" css={titlestyle}>
                임시루틴
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border="none">
          <h2>
            <AccordionButton css={buttonstyle}>
              <Box as="span" css={titlestyle}>
                기록하기
              </Box>
              <AccordionIcon />
            </AccordionButton >
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border="none">
          <h2>
            <AccordionButton css={buttonstyle}>
              <Box as="span" css={titlestyle}>
                프로그램 생성
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br></br>
      <Button css={backbuttonstyle} >뒤로 가기</Button>
    </div >


  );
};

export default Routine;
