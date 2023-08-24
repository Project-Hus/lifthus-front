import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Text,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import useUserStore from "../../store/user.zustand";
import { CreatePostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import { ThemeColor } from "../../common/styles/theme.style";
import useClickEvent from "../../hooks/clickEvent";
import { useImageFileListWithPreview } from "../../hooks/images";
import ImageBoard from "../../common/components/images/ImageBoard";
import { text } from "stream/consumers";

/**
 * CreatePost buttons' style
 */
const IconbuttonStyle = styled.div`
  & > Button {
    background-color: ${ThemeColor.backgroundColorDarker};
    :hover {
      background-color: ${ThemeColor.backgroundColor};
    }
  }
`;

type CreatePostData = {
  text: string;
  images: FileList;
};

const CreatePost = () => {
  const { uid, username, profile_image_url } = useUserStore();

  const { onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (post: CreatePostDto) => postApi.createPost(post),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        removeImages(imagePreviewSources.map((_, idx) => idx));
        console.log("post created", data);
      },
      onError(error, variables, context) {},
    }
  );

  const { register, handleSubmit, reset, watch } = useForm<CreatePostData>();

  const { clickRef: imageInput, onClickRef: onClickImageUpload } =
    useClickEvent();

  //이미지 미리보기
  const { onLoadFile, imagePreviewSources, imageFileList, removeImages } =
    useImageFileListWithPreview();

  const onSubmit = async (data: CreatePostData) => {
    if (data.text.length == 0) return alert("내용을 입력해주세요");

    try {
      const post: CreatePostDto = {
        author: uid,
        content: data.text,
        images: imageFileList,
      };
      await mutate(post);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        size="sm"
        bgColor={ThemeColor.backgroundColorDarker}
        color="white"
        fontSize="0.7em"
        margin="0.5em"
        marginBottom={"0em"}
      >
        <CardHeader paddingBottom={"0"}>
          <Flex letterSpacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={username} src={profile_image_url} />
              <Box>
                <Heading fontSize="1.1em">{username}</Heading>
                <Text fontSize={"0.9em"} color="gray.400"></Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        {!!imagePreviewSources.length && !!imagePreviewSources.length && (
          <ImageBoard srcs={imagePreviewSources} removeImages={removeImages} />
        )}
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Textarea {...register("text")} resize="none" />
            <Flex justifyContent={"space-between"}>
              <IconbuttonStyle>
                <Button onClick={onClickImageUpload}>
                  <PlusSquareIcon />
                  <Input
                    multiple
                    type="file"
                    accept="image/*"
                    {...register("images")}
                    ref={imageInput}
                    display="none"
                    onChange={onLoadFile}
                  />
                </Button>
                <Button
                  onClick={() =>
                    alert("This feature will come with routine service..!")
                  }
                >
                  share routine
                </Button>
              </IconbuttonStyle>
              <Button
                variant="ghost"
                color={"white"}
                type="submit"
                _hover={{ bg: ThemeColor.backgroundColor }}
              >
                {isLoading ? "..." : "Post"}
              </Button>
            </Flex>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default CreatePost;
