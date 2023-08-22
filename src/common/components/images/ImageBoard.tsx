import { CloseIcon } from "@chakra-ui/icons";
import { Button, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { ThemeColor } from "../../styles/theme.style";

const ImageBoardDiv = styled.div`
  margin-top: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${ThemeColor.backgroundColor};
  border-left: solid 0.5em ${ThemeColor.backgroundColorDarker};
  border-right: solid 0.5em ${ThemeColor.backgroundColorDarker};
  overflow-x: scroll;
`;

const ImageBoard = ({
  srcs,
  removeImages,
}: {
  srcs: string[];
  removeImages: any;
}) => {
  return (
    <ImageBoardDiv>
      {!!srcs.length &&
        srcs.map((src, i) => (
          <>
            <Image
              margin={"auto"}
              key={i}
              src={src}
              objectFit="contain"
              w="80%"
              alt="rep's imagefile"
            />
            <Button
              rounded={"0"}
              variant={"ghost"}
              bg={ThemeColor.backgroundColorDarker}
              _hover={{ bg: ThemeColor.backgroundColorDarker }}
              onClick={() => removeImages([i])}
            >
              <CloseIcon fontSize={"2xl"} />
            </Button>
          </>
        ))}
    </ImageBoardDiv>
  );
};

export default ImageBoard;
