import {
  CreatePostDto,
  DeletePostResponse,
  QueryPostDto,
  QueryPostSummaryDto,
  UpdatePostDto,
  UpdatePostResponse,
} from "../dtos/post.dto";

export interface PostApi {
  getPost: ({
    pid,
    slug,
  }: {
    pid?: number;
    slug?: string;
  }) => Promise<QueryPostDto>;
  getAllPosts: (skip?: number) => Promise<QueryPostSummaryDto[]>;
  getUserPosts: ({
    uid,
    skip,
  }: GetUserPostsParams) => Promise<QueryPostSummaryDto[]>;
  getUsersPosts: ({
    users,
    skip,
  }: {
    users: number[];
    skip: number;
  }) => Promise<QueryPostSummaryDto[]>;
  createPost: ({
    userGroup,
    author,
    content,
  }: CreatePostDto) => Promise<QueryPostDto>;
  updatePost: ({
    id,
    author,
    content,
  }: UpdatePostDto) => Promise<UpdatePostResponse>;
  deletePost: (pid: number) => Promise<DeletePostResponse>;
  likePost: (pid: number) => Promise<number>;
}

export type GetUserPostsParams = {
  uid: number;
  skip?: number;
};
