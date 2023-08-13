import {
  CreatePostDto,
  DeletePostResponse,
  QueryPostDto,
  UpdatePostDto,
  UpdatePostResponse,
} from "../dtos/post.dto";

export interface PostApi {
  getAllPosts: (skip?: number) => Promise<QueryPostDto[]>;
  getUserPosts: ({ uid, skip }: GetUserPostsParams) => Promise<QueryPostDto[]>;
  getUsersPosts: ({
    users,
    skip,
  }: {
    users: number[];
    skip: number;
  }) => Promise<QueryPostDto[]>;
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
