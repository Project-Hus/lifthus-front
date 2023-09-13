import { LikeDto } from "../dtos/like.dto";
import {
  CreatePostDtoInput,
  DeletePostResponse,
  PostDto,
  UpdatePostDtoInput,
} from "../dtos/post.dto";

export interface PostApi {
  getPost: ({ pid, slug }: { pid?: string; slug?: string }) => Promise<PostDto>;
  getAllPosts: (skip?: number) => Promise<PostDto[]>;
  getUsersPosts: ({
    users,
    skip,
  }: {
    users: string[];
    skip: number;
  }) => Promise<PostDto[]>;
  createPost: ({
    author,
    images,
    content,
  }: CreatePostDtoInput) => Promise<PostDto>;
  updatePost: ({ id, author, content }: UpdatePostDtoInput) => Promise<PostDto>;
  deletePost: (pid: string) => Promise<DeletePostResponse>;
  likePost: (pid: string) => Promise<LikeDto>;
}

export type GetUserPostsParams = {
  uid: string;
  skip?: number;
};
