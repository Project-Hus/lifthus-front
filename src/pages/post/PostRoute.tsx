import React from "react";
import { Route, Routes } from "react-router-dom";
import SinglePost from "./SinglePost";

const PostRoute = () => {
  return (
    <Routes>
      <Route path="/:slug" element={<SinglePost />} />
    </Routes>
  );
};

export default PostRoute;
