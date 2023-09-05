import {
  CreatePostDto,
  DeletePostResponse,
  QueryPostDto,
  PostSummary,
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
  getAllPosts: (skip?: number) => Promise<PostSummary[]>;
  getUserPosts: ({ uid, skip }: GetUserPostsParams) => Promise<PostSummary[]>;
  getUsersPosts: ({
    users,
    skip,
  }: {
    users: number[];
    skip: number;
  }) => Promise<PostSummary[]>;
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
