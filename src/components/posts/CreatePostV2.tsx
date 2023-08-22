import React, { useCallback, useRef, useState } from "react";
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
import { CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import styled from "@emotion/styled";
import useUserStore from "../../store/user.zustand";
import { CreatePostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import { ThemeColor } from "../../common/styles/theme.style";

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

const CreatePostV2 = () => {
  const { uid, username, profile_image_url } = useUserStore();

  const { onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (post: CreatePostDto) => postApi.createPost(post),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );

  const { register, handleSubmit, reset, watch } = useForm<CreatePostData>();

  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, []);
  //이미지 미리보기
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const image = watch("images");
  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    console.log("FILE", files);

    let urlList = [];
    if (files) {
      const fileList = Array.from(files);
      for (const url of fileList) {
        urlList.push(URL.createObjectURL(url));
      }
      setImagePreview(urlList);
    }
  };

  const onSubmit = async (data: CreatePostData) => {
    if (data.text.length == 0) return alert("내용을 입력해주세요");

    try {
      const post: CreatePostDto = {
        author: uid,
        // images: imagePreview,
        content: data.text,
      };
      await mutate(post);
      setImagePreview([]);
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: ThemeColor.backgroundColor,
            borderLeft: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
            borderRight: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
          }}
        >
          {imagePreview.length != 0 &&
            imagePreview.map((src, i) => (
              <Image
                key={i}
                src={src}
                objectFit="contain"
                maxH={"50vh"}
                alt="rep's imagefile"
              />
            ))}
          {imagePreview.length > 0 && (
            <Button onClick={() => setImagePreview([])}>
              <CloseIcon />
            </Button>
          )}
        </div>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              color="black"
              {...register("text")}
              backgroundColor="white"
            />

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

export default CreatePostV2;
