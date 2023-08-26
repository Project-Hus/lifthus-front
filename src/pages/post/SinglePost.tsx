import React from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/posts/post/Post";

const SinglePost = () => {
  const slug = encodeURIComponent(useParams().slug || "");
  return (
    <div>
      <Post slug={slug} />
    </div>
  );
};

export default SinglePost;
