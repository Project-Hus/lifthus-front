import {
  CreatePostDtoInput,
  DeletePostResponse,
  PostDto,
  UpdatePostDtoInput,
  UpdatePostResponse,
} from "../dtos/post.dto";
import { PostSummaryDto } from "../dtos/postSummary.dto";

export interface PostApi {
  getPost: ({ pid, slug }: { pid?: number; slug?: string }) => Promise<PostDto>;
  getAllPosts: (skip?: number) => Promise<PostSummaryDto[]>;
  getUserPosts: ({
    uid,
    skip,
  }: GetUserPostsParams) => Promise<PostSummaryDto[]>;
  getUsersPosts: ({
    users,
    skip,
  }: {
    users: number[];
    skip: number;
  }) => Promise<PostSummaryDto[]>;
  createPost: ({
    author,
    images,
    content,
  }: CreatePostDtoInput) => Promise<PostDto>;
  updatePost: ({
    id,
    author,
    content,
  }: UpdatePostDtoInput) => Promise<UpdatePostResponse>;
  deletePost: (pid: number) => Promise<DeletePostResponse>;
  likePost: (pid: number) => Promise<number>;
}

export type GetUserPostsParams = {
  uid: number;
  skip?: number;
};
