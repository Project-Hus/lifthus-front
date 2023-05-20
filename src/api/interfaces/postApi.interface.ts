import {
  CreatePostDto,
  DeletePostDto,
  QueryPostDto,
  UpdatePostDto,
} from "../dtos/post.dto";
import { Uid } from "./userApi.interface";

export interface RepsApi {
  getUserPosts: ({
    username,
    skip,
  }: GetUserPostsParams) => Promise<QueryPostDto[]>;
  createPost: ({
    userGroup,
    author,
    content,
  }: CreatePostDto) => Promise<QueryPostDto>;
  updatePost: ({
    id,
    author,
    content,
  }: UpdatePostDto) => Promise<UpdatePostDto>;
  deletePost: (pid: number) => Promise<DeletePostDto>;
}

export type GetUserPostsParams = {
  username: string;
  skip?: number;
};
