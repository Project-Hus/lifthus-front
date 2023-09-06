import { CheckIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { PostDto, UpdatePostDtoInput } from "../../../api/dtos/post.dto";
import postApi from "../../../api/postApi";
import ImageBoard from "../../../common/components/images/ImageBoard";
import { ThemeColor } from "../../../common/styles/theme.style";
import { useImageFileListWithPreview } from "../../../hooks/images";
import { IconButtonStyleDiv } from "./Post2";

type PostEditingProps = {
  post: PostDto;
  closeEdit: () => void;
};

type FormData = {
  content: string;
  images: FileList;
};

const PostEdit = ({ post: postOriginal, closeEdit }: PostEditingProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>();

  const { data: postQueried } = useQuery<PostDto>({
    queryKey: ["post", { pid: postOriginal.id }],
    queryFn: async () => {
      return postApi.getPost({ pid: postOriginal.id });
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    onSuccess(data: PostDto) {
      if (!data) return;
      setValue("content", data.content);
    },
  });

  const post = postQueried || postOriginal;

  const { mutate: editPost, isLoading } = useMutation(
    async (_: FormData) => {
      try {
        const content = getValues("content");
        if (content.length === 0) return alert("내용을 입력해주세요");
        const editedPost: UpdatePostDtoInput = {
          id: post.id,
          author: post.author,
          content: content,
        };
        return postApi.updatePost(editedPost);
      } catch (err) {
        alert("editing post failed T.T");
        return err;
      }
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["post", { pid: post.id }] });
        queryClient.invalidateQueries({
          queryKey: ["post", { slug: post.slug }],
        });
        closeEdit();
      },
    }
  );

  return (
    <>
      <ImageBoard
        srcs={(post && post.images) /*?.map((img) => img.src)*/ || []}
      />
      <form onSubmit={handleSubmit((fd) => editPost(fd))}>
        <Textarea defaultValue={post.content} {...register("content")} />
        <Flex justifyContent={"space-between"}>
          <IconButtonStyleDiv>
            {/* // implement image update later
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
            */}
            <Button
              onClick={() =>
                alert("This feature will come with routine service..!")
              }
            >
              share routine
            </Button>
          </IconButtonStyleDiv>
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
                closeEdit();
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
  );
};

export default PostEdit;
