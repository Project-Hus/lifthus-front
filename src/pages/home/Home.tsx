import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { QueryPostDto } from "../../api/dtos/post.dto";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { LIFTHUS_API_URL } from "../../common/routes";
import Posts from "../../components/Posts";
import CreatePost from "../../components/posts/CreatePost";

const Home = () => {
  const { data: posts } = useQuery<QueryPostDto[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get(LIFTHUS_API_URL + "/post/query/post/all/0");
      return res.data;
    },
  });
  return (
    <div>
      <BasicPageLayout>
        <CreatePost />
        <Posts posts={posts || []} />
      </BasicPageLayout>
    </div>
  );
};

export default Home;
