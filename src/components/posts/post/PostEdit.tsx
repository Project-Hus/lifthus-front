import { CheckIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { QueryPostDto, UpdatePostDto } from "../../../api/dtos/post.dto";
import postApi from "../../../api/postApi";
import ImageBoard from "../../../common/components/images/ImageBoard";
import { ThemeColor } from "../../../common/styles/theme.style";
import { useImageFileListWithPreview } from "../../../hooks/images";
import { IconButtonStyleDiv } from "./Post";

type PostEditingProps = {
  post: QueryPostDto;
  postQueryKey: any;
  closeEdit: () => void;
};

type FormData = {
  content: string;
  images: FileList;
};

const PostEdit = ({ post, postQueryKey, closeEdit }: PostEditingProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues } = useForm<FormData>();

  /* implement image update later */
  // const { onLoadFile, imagePreviewSources, imageFileList, removeImages } =
  //   useImageFileListWithPreview(
  //     (post && post.images?.map((img) => img.src)) || []
  //   );

  const { mutate: editPost, isLoading } = useMutation(
    async (_: FormData) => {
      try {
        const content = getValues("content");
        if (content.length === 0) return alert("내용을 입력해주세요");
        const editedPost: UpdatePostDto = {
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
        queryClient.invalidateQueries({ queryKey: ["post", postQueryKey] });
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
        <Textarea
          defaultValue={!!post ? post.content : ""}
          {...register("content")}
        />
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
