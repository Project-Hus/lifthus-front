import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { PostDto } from "../../api/dtos/post.dto";
import { UserDto } from "../../api/dtos/user.dto";
import postApi from "../../api/postApi";
import userApi from "../../api/userApi";
import BlueSpinnerCentered from "../../common/components/spinners/BlueSpinnerCentered";
import Post2 from "../../components/posts/post/Post2";
import NotFoundPage from "../error/NotFoundPage";

const SinglePost = () => {
  const slug = encodeURIComponent(useParams().slug || "");
  const {
    data: post,
    isLoading: postLoading,
    isError,
  } = useQuery<PostDto>(
    ["post", { slug: slug }],
    async () => {
      return await postApi.getPost({ slug });
    },
    {
      retry: false,
    }
  );

  const { data: author } = useQuery<UserDto | null>({
    queryKey: ["user", { uid: post?.author }],
    queryFn: async () => {
      return !!post ? await userApi.getUserInfo({ uid: post.author }) : null;
    },
    enabled: !!post,
  });

  if (post === null || isError) return <NotFoundPage />;
  return (
    <div>
      {postLoading && <BlueSpinnerCentered />}
      {!!post && <Post2 post={post} author={author || undefined} open={true} />}
    </div>
  );
};

export default SinglePost;
