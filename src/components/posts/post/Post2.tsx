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
import { SLUG_MAX_LENGTH } from "../../../common/constraints";

type FormData = {
  content: string;
  images: FileList;
};

interface PostProp {
  post: PostDto;
  author: UserDto | undefined;
  open?: boolean; // if true, the post is always open and shows the post that is only passed as a prop
}

const Post2 = ({ post: postInput, author, open = false }: PostProp) => {
  const queryClient = useQueryClient();

  // author info
  const username = author?.username || "Unknown user";
  const profileImage = author?.profile_image_url;

  // content abstract to be shown when the post is not open
  const [abstract, updateAbstract] = useState<string>(postInput.content);

  // whether the post is open or not
  const [isOpen, setOpen] = useState<boolean>(open);

  const { data: postQueried, refetch: refetchPost } = useQuery<PostDto>({
    queryKey: ["post", { pid: postInput.id }],
    queryFn: async () => {
      return await postApi.getPost({ pid: postInput.id });
    },
    enabled: isOpen && !open,
    onSuccess: (data: PostDto) => {
      updateAbstract(data.content.slice(0, SLUG_MAX_LENGTH));
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
        queryClient.invalidateQueries({
          queryKey: ["post", { slug: post.slug }],
        });
      },
    }
  );

  const { register, handleSubmit } = useForm<FormData>();

  // post editing
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
        queryClient.invalidateQueries([
          ["post", { pid: post.id }],
          ["post", { slug: post.slug }],
        ]);
        setEditing(false);
      },
    }
  );

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
          <ImageBoard srcs={(isOpen ? post.images : postInput.images) || []} />
        )}

        <CardBody paddingTop="0.5em">
          {isEditing && post ? (
            <PostEdit
              post={post}
              postQueryKey={{ pid: post.id }}
              closeEdit={() => setEditing(false)}
            />
          ) : (
            <>
              <Text style={{ whiteSpace: "pre-wrap" }}>
                {isOpen ? post.content : abstract}
                {!open &&
                  (abstract.length >= SLUG_MAX_LENGTH ||
                    !!post.images.length) && (
                    <>
                      <Button
                        alignSelf="flex-start"
                        onClick={() => {
                          setOpen(true);
                        }}
                        size="md"
                        color={ThemeColor.linkColor}
                        variant={"link"}
                        display={isOpen ? "none" : "block"}
                      >
                        more...
                      </Button>
                      <Button
                        alignSelf="flex-start"
                        onClick={() => {
                          setOpen(false);
                        }}
                        size="md"
                        color={ThemeColor.linkColor}
                        variant={"link"}
                        display={isOpen ? "block" : "none"}
                      >
                        briefly...
                      </Button>
                    </>
                  )}
              </Text>
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
            refetchPost={refetchPost}
          />
        )}
      </Card>
    </>
  );
};

export default Post2;
