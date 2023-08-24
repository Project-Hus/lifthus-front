import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Spinner, Textarea, Link as LinkChakra } from "@chakra-ui/react";

import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef } from "react";
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

import CommentList from "./commentList";

import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CommentCreate from "./commentCreate";
import { useForm } from "react-hook-form";

import styled from "@emotion/styled";
import { postFoldStandard } from "../../common/constraints";
import { QueryPostDto, UpdatePostDto } from "../../api/dtos/post.dto";
import postApi from "../../api/postApi";
import userApi from "../../api/userApi";

import { GetUserInfoDto } from "../../api/dtos/user.dto";
import { Link } from "react-router-dom";
import useUserStore from "../../store/user.zustand";
import ImageBoard from "../../common/components/images/ImageBoard";
import { useImageFileListWithPreview } from "../../hooks/images";
import { LIFTHUS_API_URL } from "../../common/routes";
import axios from "axios";

//resizing textarea
function resize(e: React.ChangeEvent<HTMLTextAreaElement>) {
  let textarea = e.target;

  textarea!.style.height = "0px";

  let scrollHeight = textarea.scrollHeight;

  textarea.style.height = scrollHeight + "px";
}

interface PostProp {
  pid?: number;
  slug?: string;
}
type FormData = {
  content: string;
  images: FileList;
};

// Post component
const Post = ({ pid, slug }: PostProp) => {
  const clientUid = useUserStore((state) => state.uid);

  // query the post by pid or slug
  const secondQueryKey = { pid, slug };
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
  } = useQuery<QueryPostDto>({
    queryKey: ["post", secondQueryKey],
    queryFn: async () => {
      return await postApi.getPost(secondQueryKey);
    },
  });

  // query the comments of the post
  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", { pid: post?.id }],
    queryFn: async () => {
      if (!post) return Promise.reject("undefined");
      const res = await axios.get(
        LIFTHUS_API_URL + `/post/query/comment?pid=${post.id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  // query the author info
  const {
    data: author,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<GetUserInfoDto>({
    queryKey: ["user", { uid: post?.author }],
    queryFn: () =>
      !post
        ? Promise.reject("undefined")
        : userApi.getUserInfo({ uid: post.author }),
    enabled: !!post,
  });

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormData>();

  const { ref, ...rest } = register("content");

  const { getDisclosureProps, getButtonProps, onClose } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  const queryClient = useQueryClient();

  // whether the client is editing the post
  const [isEditing, setEditing] = useState(false);

  // delete post
  const { mutate: deleteMutate } = useMutation(
    async () =>
      !post ? Promise.reject("undefined") : postApi.deletePost(post.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );

  // update post
  const { mutate, isLoading } = useMutation(
    async (post: UpdatePostDto) =>
      postApi.updatePost({
        id: post.id,
        author: post.author,
        content: post.content,
      }),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        console.log("query reload");
        setEditing(false);
      },
    }
  );

  // useRef를 이용해 input태그에 접근한다.
  const imageInput = useRef<HTMLInputElement | null>(null);
  // 버튼클릭시 input태그에 클릭이벤트를 걸어준다.
  const onCickImageUpload = () => {
    imageInput.current?.click();
  };

  //이미지 미리보기
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { onLoadFile, imagePreviewSources, imageFileList, removeImages } =
    useImageFileListWithPreview();

  const editPost = async (data: FormData) => {
    if (data.content.length == 0) return alert("내용을 입력해주세요");
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

  // function for floding the comment
  const [IsFold, setFold] = useState(true);

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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef.current) {
      console.log(textareaRef.current.scrollHeight + "px");
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  });

  // get the number of comments
  let numComments = post && comments && comments.length;
  if (post && post.comments) {
    for (const c of post.comments) {
      numComments += c.replies ? c.replies.length : 0;
    }
  }

  // like post mutation
  const { mutate: likeMutate, isLoading: likeLoading } = useMutation(
    () => (!post ? Promise.reject("undefined") : postApi.likePost(post.id)),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["post", secondQueryKey] });
      },
    }
  );

  const username = author?.username;
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
              <Avatar name={username} src={profileImage} />
              <Box>
                <LinkChakra as={Link} to={`/profile/${username}`}>
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
                    {post && post.author == clientUid && (
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
              <Button onClick={() => setImagePreview([])}>
                <CloseIcon />
              </Button>
              <Image src={imagePreviewSources[0]}></Image>
            </>
          ) : (
            <></>
          )}
          {isEditing != true && <></>}
        </div>

        <CardBody paddingTop="0.5em">
          {isEditing ? (
            <>
              <form onSubmit={handleSubmit(editPost)}>
                <Textarea
                  border="0px"
                  color="black"
                  backgroundColor="white"
                  defaultValue={!!post ? post.content : ""}
                  overflowWrap="anywhere"
                  overflow="hidden"
                  resize="none"
                  {...rest}
                  ref={(e) => {
                    ref(e);
                    textareaRef.current = e;
                  }}
                  onChange={resize}
                  box-sizing="border-box"
                />
                <Flex justifyContent={"space-between"}>
                  <IconbuttonStyle>
                    <Button onClick={onCickImageUpload}>
                      <PlusSquareIcon />
                      <Input
                        {...register("images")}
                        id="file"
                        type="file"
                        onChange={onLoadFile}
                        ref={imageInput}
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
                        setImagePreview([]);
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
        {!isEditing && (
          <CardFooter justify="space-between">
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<>{likeLoading ? <Spinner /> : "🤍"}</>}
              _hover={{ bg: ThemeColor.backgroundColor }}
              onClick={() => likeMutate()}
            >
              <Text color="white">{!!post && post.likenum} Likes</Text>
            </Button>
            <Button
              {...buttonProps}
              flex="1"
              variant="ghost"
              leftIcon={<>💬</>}
              _hover={{ bg: ThemeColor.backgroundColor }}
            >
              <Text color="white">{numComments} Comments</Text>
            </Button>
          </CardFooter>
        )}
        {!isEditing && (
          <Card {...disclosureProps}>
            {!!clientUid && !!post && (
              <CommentCreate postId={post.id} onClose={onClose} />
            )}
            {!!post && comments && <CommentList comments={comments} />}
          </Card>
        )}
      </Card>
    </>
  );
};

export default Post;
