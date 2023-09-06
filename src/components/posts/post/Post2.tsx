import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Textarea, Link as LinkChakra } from "@chakra-ui/react";

import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";

import { ThemeColor } from "../../../common/styles/theme.style";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import postApi from "../../../api/postApi";
import userApi from "../../../api/userApi";

import { Link } from "react-router-dom";
import useUserStore from "../../../store/user.zustand";
import ImageBoard from "../../../common/components/images/ImageBoard";
import { useImageFileListWithPreview } from "../../../hooks/images";

import PostFooter from "./PostFooter";
import styled from "@emotion/styled";
import PostMenu, { PostHeader } from "./PostHeader";
import PostEdit from "./PostEdit";
import { PostSummaryDto } from "../../../api/dtos/postSummary.dto";
import {
  PostDto,
  PostJSON,
  UpdatePostDtoInput,
} from "../../../api/dtos/post.dto";
import { UserDto } from "../../../api/dtos/user.dto";

type FormData = {
  content: string;
  images: FileList;
};

export const IconButtonStyleDiv = styled.div`
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

interface PostProp {
  post: PostDto;
  author: UserDto | undefined;
  open?: boolean; // if true, the post is always open and shows the post that is only passed as a prop
}

const Post2 = ({ post: postInput, author, open = false }: PostProp) => {
  const queryClient = useQueryClient();

  const [isOpen, setOpen] = useState(open);
  const { data: postQueried } = useQuery<PostDto>({
    queryKey: ["post", { pid: postInput.id }],
    queryFn: async () => {
      // either if if is not open or it is basically open, show the given post.
      // if it isn't, that is, if it is open and the post is not basically open, query the post.
      if (!isOpen || open) return postInput;
      return await postApi.getPost({ pid: postInput.id });
    },
  });

  const post = postQueried || postInput;

  const clientUid = useUserStore((state) => state.uid);

  // post deletion
  const { mutate: deleteMutate } = useMutation(
    async () => postApi.deletePost(post.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    }
  );

  // comments folding
  const [IsFold, setFold] = useState(true);

  // author info
  const username = author?.username || "Unknown user";
  const profileImage = author?.profile_image_url;

  const { register, handleSubmit } = useForm<FormData>();

  const { onLoadFile, imagePreviewSources, imageFileList, removeImages } =
    useImageFileListWithPreview();

  const [isEditing, setEditing] = useState(false);

  const { mutate, isLoading } = useMutation(
    async (post: UpdatePostDtoInput) =>
      postApi.updatePost({
        id: post.id,
        author: post.author,
        content: post.content,
      }),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: ["post", { pid: post.id }],
        });
        setEditing(false);
      },
    }
  );

  const editPost = async (data: FormData) => {
    if (data.content.length === 0) return alert("내용을 입력해주세요");
    try {
      const editedPost: UpdatePostDtoInput = {
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
            <PostHeader
              profileImageSrc={profileImage || ""}
              username={username}
              timestamp={post.createdAt || new Date()}
            />
            <PostMenu
              author={post.author}
              slug={post.slug || ""}
              setEditing={() => setEditing(true)}
              deletePost={() => deleteMutate()}
            />
          </Flex>
        </CardHeader>

        {!isEditing && (
          <ImageBoard srcs={post.images /*?.map((img) => img.src)*/ || []} />
        )}

        <CardBody paddingTop="0.5em">
          {isEditing && post ? (
            // <PostEdit
            //   post={post}
            //   postQueryKey={{ pid: postSumm.id }}
            //   closeEdit={() => setEditing(false)}
            // />
            <></>
          ) : (
            <>
              <Text style={{ whiteSpace: "pre-wrap" }}>{post.content}</Text>
              {
                <IconButtonStyleDiv>
                  <>
                    <Button
                      alignSelf="flex-start"
                      onClick={() => setOpen(true)}
                      size="sm"
                      display={IsFold ? "block" : "none"}
                    >
                      more...
                    </Button>
                    <Button
                      alignSelf="flex-start"
                      onClick={() => setFold(false)}
                      size="sm"
                      display={IsFold ? "none" : "block"}
                    >
                      {" "}
                      briefly...
                    </Button>
                  </>
                </IconButtonStyleDiv>
              }
            </>
          )}
        </CardBody>
        {!isEditing && post.id && (
          <PostFooter
            pid={post.id}
            slug={post.slug}
            likesNum={post.likesNum}
            commentsNum={post.commentsNum}
            liked={post.clientLiked}
          />
        )}
      </Card>
    </>
  );
};

export default Post2;
