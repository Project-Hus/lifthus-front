import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";

import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

import { ThemeColor } from "../../../common/styles/theme.style";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import postApi from "../../../api/postApi";
import ImageBoard from "../../../common/components/images/ImageBoard";

import PostFooter from "./PostFooter";
import styled from "@emotion/styled";
import PostMenu, { PostHeader } from "./PostHeader";
import PostEdit from "./PostEdit";

import { PostDto } from "../../../api/dtos/post.dto";
import { UserDto } from "../../../api/dtos/user.dto";
import {
  POST_EXCERPT_LENGTH,
  SLUG_MAX_LENGTH,
} from "../../../common/constraints";

type FormData = {
  content: string;
  images: FileList;
};

interface PostProp {
  post: PostDto;
  author: UserDto | undefined;
  open?: boolean; // if true, the post is always open and shows the post that is only passed as a prop
}

const Post = ({ post: postInput, author, open = false }: PostProp) => {
  const queryClient = useQueryClient();

  // author info
  const username = author?.username || "Unknown user";
  const profileImage = author?.profile_image_url;

  // whether the post is open or not
  const [isOpen, setOpen] = useState<boolean>(open);

  const { data: postQueried, refetch: refetchPost } = useQuery<PostDto>({
    queryKey: ["post", { pid: postInput.id }],
    queryFn: async () => {
      return await postApi.getPost({ pid: postInput.id });
    },
    enabled: isOpen && !open,
  });

  const post = postQueried || postInput;
  const excerpt = post.content.slice(0, POST_EXCERPT_LENGTH);

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

  // post editing
  const [isEditing, setEditing] = useState(false);

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
          <ImageBoard
            srcs={isOpen ? post.imageSrcs || [] : post.imageSrcs.slice(0, 1)}
          />
        )}

        <CardBody paddingTop="0.5em">
          {isEditing && post ? (
            <PostEdit post={post} closeEdit={() => setEditing(false)} />
          ) : (
            <>
              <Text style={{ whiteSpace: "pre-wrap" }}>
                {isOpen
                  ? post.content
                  : excerpt +
                    (post.content.length > excerpt.length ? "..." : "")}
                {!open &&
                  (excerpt.length < post.content.length ||
                    post.imageSrcs.length > 1) && (
                    <>
                      {!isOpen ? (
                        <PostDetailButton onClick={() => setOpen(true)}>
                          &nbsp;&nbsp;&nbsp;more...
                        </PostDetailButton>
                      ) : (
                        <PostDetailButton onClick={() => setOpen(false)}>
                          &nbsp;&nbsp;&nbsp;briefly
                        </PostDetailButton>
                      )}
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

export default Post;

type PostDetailButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const PostDetailButton = ({ onClick, children }: PostDetailButtonProps) => {
  return (
    <Button
      alignSelf="flex-start"
      onClick={onClick}
      size="lg"
      color={ThemeColor.linkColor}
      variant={"link"}
    >
      {children}
    </Button>
  );
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
