import {
  Button,
  Card,
  CardFooter,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Suspense } from "react";
import postApi from "../../../api/postApi";
import BlueSpinnerCentered from "../../../common/components/spinners/BlueSpinnerCentered";
import { ThemeColor } from "../../../common/styles/theme.style";
import useUserStore from "../../../store/user.zustand";
import CommentCreate from "./commentCreate";
import CommentList from "./CommentList";

const PostFooter = ({
  pid,
  slug,
  likesNum,
  commentsNum,
  liked,
  refetchPost,
}: {
  pid: string;
  slug: string;
  likesNum: number;
  commentsNum: number;
  liked: boolean;
  refetchPost: () => void;
}) => {
  const queryClient = useQueryClient();

  // get the client UID
  const { uid: clientUid } = useUserStore();

  // like post mutation
  const { mutate: likeMutate, isLoading: likeLoading } = useMutation(
    async () => await postApi.likePost(pid),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["post", { pid }]);
        queryClient.invalidateQueries(["post", { slug }]);
        refetchPost();
      },
    }
  );

  // comment disclosure
  const { getDisclosureProps, getButtonProps, onClose, isOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  const [numComments, setNumComments] = React.useState<Number>(commentsNum);

  return (
    <>
      <CardFooter justify="space-between">
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<>{likeLoading ? <Spinner /> : liked ? "❤️" : "🤍"}</>}
          _hover={{ bg: ThemeColor.backgroundColor }}
          onClick={
            clientUid
              ? () => likeMutate()
              : () => (window.location.href = "/sign")
          }
        >
          <Text color="white">{likesNum} Likes</Text>
        </Button>
        <Button
          {...buttonProps}
          flex="1"
          variant="ghost"
          leftIcon={<>💬</>}
          _hover={{ bg: ThemeColor.backgroundColor }}
        >
          <Text color="white">{`${commentsNum} Comments`}</Text>
        </Button>
      </CardFooter>
      <Card {...disclosureProps}>
        {!!clientUid && pid && <CommentCreate postId={pid} onClose={onClose} />}
        <Suspense fallback={<BlueSpinnerCentered />}>
          {isOpen && <CommentList pid={pid} getNumber={setNumComments} />}
        </Suspense>
      </Card>
    </>
  );
};

export default PostFooter;
