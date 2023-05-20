import { QueryCommentDto } from "./comment.dto";

export type QueryPostDto = {
  id: number;
  userGroup?: number;
  author: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  images?: string[];
  content: string;
  likenum: number;
  comments?: QueryCommentDto[];
  mentions?: string[];
};

export type CreatePostDto = {
  userGroup?: number;
  author: number;
  content: string;
};

export type UpdatePostDto = {
  id: number;
  author: number;
  content: string;
};

export type UpdatePostResponse = {
  count: number;
};

export type DeletePostResponse = {
  count: number;
};
