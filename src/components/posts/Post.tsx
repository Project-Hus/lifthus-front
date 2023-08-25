import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Textarea, Link as LinkChakra } from "@chakra-ui/react";

import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

import { ThemeColor } from "../../common/styles/theme.style";
import { Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { postFoldStandard } from "../../common/constraints";
import { QueryPostDto, UpdatePostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import userApi from "../../api/userApi";

import { GetUserInfoDto } from "../../api/dtos/user.dto";
import { Link } from "react-router-dom";
import useUserStore from "../../store/user.zustand";
import ImageBoard from "../../common/components/images/ImageBoard";
import { useImageFileListWithPreview } from "../../hooks/images";

import commentApi from "../../api/commentApi";
import PostFooter from "./PostFooter";
import styled from "@emotion/styled";

interface PostProp {
  pid?: number;
  slug?: string;
}
type FormData = {
  content: string;
  images: FileList;
};
const IconbuttonStyle = styled.div`
  padding-top: 0em;
  & > Button {
    background-color: ${ThemeColor.backgroundColorDarker};
    :hover {
      text-decoration-line: underline;
    }
    :hover {
      background-color: ${ThemeColor.backgroundColor};
    }
  }
`;

/**
 * Takes pid or slug as a prop and renders the post after fetching the data of corresponding post.
 * It also queries the comments of the post and renders them with Comment-related components.
 *
 * @param param0
 * @returns JSX.Element
 */
const Post = ({ pid, slug }: PostProp) => {
  const queryClient = useQueryClient();
  // get the client's uid
  const clientUid = useUserStore((state) => state.uid);

  // query the post by pid or slug
  const postQueryKey = pid ? { pid } : { slug };
  const { data: post } = useQuery<QueryPostDto>({
    queryKey: ["post", postQueryKey],
    queryFn: async () => {
      return await postApi.getPost(postQueryKey);
    },
  });
  // query the author info
  const { data: author } = useQuery<GetUserInfoDto | null>({
    queryKey: ["user", { uid: post?.author }],
    queryFn: async () =>
      !post
        ? Promise.reject(undefined)
        : await userApi.getUserInfo({ uid: post.author }),
  });

  // editing post
  const { register, handleSubmit } = useForm<FormData>();
  const [isEditing, setEditing] = useState(false);
  const { mutate, isLoading } = useMutation(
    async (post: UpdatePostDto) =>
      postApi.updatePost({
        id: post.id,
        author: post.author,
        content: post.content,
      }),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["post", postQueryKey] });
        setEditing(false);
      },
    }
  );

  const editPost = async (data: FormData) => {
    if (data.content.length === 0) return alert("내용을 입력해주세요");
    // 기존 이미지에서 변경되지 않은 경우
    try {
      if (!post) return;
      const editedPost: UpdatePostDto = {
        id: post.id,
        author: post.author,
        //images: imagePreview ? imagePreview : [],
        content: data.content,
      };
      await mutate(editedPost);
    } catch (error) {
      console.error(error);
    }
  };

  // deleting post
  const { mutate: deleteMutate } = useMutation(
    async () =>
      !post ? Promise.reject("undefined") : postApi.deletePost(post.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );

  const { onLoadFile, imagePreviewSources, imageFileList, removeImages } =
    useImageFileListWithPreview();

  // function for floding the comment
  const [IsFold, setFold] = useState(true);
  const username = author?.username || "Unknown user";
  const profileImage = author?.profile_image_url;
  return (
    <>
      <Card
        bgColor={ThemeColor.backgroundColorDarker}
        color="white"
        fontSize="0.7em"
        margin="0.5em"
      >
        <CardHeader paddingBottom={"0"}>
          <Flex letterSpacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar src={profileImage} />
              <Box>
                <LinkChakra as={Link} to={author ? `/profile/${username}` : ""}>
                  <Heading fontSize="1.1em">{username}</Heading>
                </LinkChakra>
                <Text fontSize={"0.9em"} color="gray.400">
                  {!!post && `${new Date(post.createdAt)}`.slice(0, 21)}
                </Text>
              </Box>
            </Flex>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    variant="unstyled"
                    isActive={isOpen}
                    as={Button}
                    color="white"
                    rightIcon={<ChevronDownIcon fontSize="2.2em" />}
                  />
                  <MenuList
                    fontSize={"1em"}
                    bgColor={ThemeColor.backgroundColorDarker}
                  >
                    <MenuItem
                      bgColor={ThemeColor.backgroundColorDarker}
                      _hover={{
                        bgColor: ThemeColor.backgroundColor,
                        color: "white",
                      }}
                      onClick={() => {
                        if (!post) return;
                        navigator.clipboard.writeText(
                          `${window.location.origin}/post/${post.slug}`
                        );
                      }}
                    >
                      <CopyIcon />
                      &nbsp;Copy URL
                    </MenuItem>
                    {post && post.author === clientUid && (
                      <>
                        <MenuItem
                          bgColor={ThemeColor.backgroundColorDarker}
                          color="yellow.400"
                          _hover={{ bgColor: "yellow.500", color: "white" }}
                          onClick={() => setEditing(true)}
                        >
                          <EditIcon />
                          &nbsp;Edit
                        </MenuItem>
                        <MenuItem
                          bgColor={ThemeColor.backgroundColorDarker}
                          color="red.400"
                          onClick={() => deleteMutate()}
                          _hover={{ bgColor: "red.500", color: "white" }}
                        >
                          <DeleteIcon />
                          &nbsp;Delete
                        </MenuItem>
                      </>
                    )}
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        </CardHeader>
        <div>
          <ImageBoard
            srcs={(post && post.images?.map((img) => img.src)) || []}
          />
          {isEditing && imagePreviewSources.length > 0 ? (
            <>
              <Button>
                <CloseIcon />
              </Button>
              <Image src={imagePreviewSources[0]}></Image>
            </>
          ) : (
            <></>
          )}
          {isEditing !== true && <></>}
        </div>

        <CardBody paddingTop="0.5em">
          {isEditing ? (
            <>
              <form onSubmit={handleSubmit(editPost)}>
                <Textarea
                  defaultValue={!!post ? post.content : ""}
                  {...register("content")}
                />
                <Flex justifyContent={"space-between"}>
                  <IconbuttonStyle>
                    <Button>
                      <PlusSquareIcon />
                      <Input
                        {...register("images")}
                        id="file"
                        type="file"
                        onChange={onLoadFile}
                        display="none"
                      ></Input>
                    </Button>
                    <Button>share routine</Button>
                  </IconbuttonStyle>
                  <div>
                    <Button
                      type="submit"
                      color="white"
                      _hover={{ bg: ThemeColor.backgroundColor }}
                      variant="ghost"
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      type="submit"
                      color="white"
                      onClick={() => {
                        if (!post) return;
                        setEditing(false);
                      }}
                      _hover={{ bg: ThemeColor.backgroundColor }}
                      variant="ghost"
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                </Flex>
              </form>
            </>
          ) : (
            <>
              <Text style={{ whiteSpace: "pre-wrap" }}>
                {IsFold &&
                !!post &&
                post.content.length > postFoldStandard.Length
                  ? post.content.slice(0, postFoldStandard.Length) + "..."
                  : !!post
                  ? post.content
                  : ""}
              </Text>
              <IconbuttonStyle>
                {(!!post ? post.content.length : 0) >
                  postFoldStandard.Length && (
                  <>
                    <Button
                      alignSelf="flex-start"
                      onClick={() => setFold(false)}
                      size="sm"
                      display={IsFold ? "block" : "none"}
                    >
                      more...
                    </Button>
                    <Button
                      alignSelf="flex-start"
                      onClick={() => setFold(true)}
                      size="sm"
                      display={IsFold ? "none" : "block"}
                    >
                      {" "}
                      shortly...
                    </Button>
                  </>
                )}
              </IconbuttonStyle>
            </>
          )}
        </CardBody>
        {!isEditing && post?.id && (
          <PostFooter pid={post.id} slug={post.slug} likenum={post.likenum} />
        )}
      </Card>
    </>
  );
};

export default Post;
