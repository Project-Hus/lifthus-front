import {
  CreatePostDto,
  DeletePostResponse,
  QueryPostDto,
  UpdatePostDto,
  UpdatePostResponse,
} from "../dtos/post.dto";
import { GetUserPostsParams, PostApi } from "../interfaces/postApi.interface";
import postList, { postState } from "../mocks/postApi.mock";
import userTestApi from "./userTestApi";
import statusInfo from "../interfaces/statusInfo.json";
import { SigningState } from "../mocks/state.mcok";
import commentList, { replyList } from "../mocks/commentApi.mock";

const postTestApi: PostApi = {
  getUserPosts: async ({
    username,
    skip,
  }: GetUserPostsParams): Promise<QueryPostDto[]> => {
    try {
      const { uid } = await userTestApi.getIdByName({ username });
      const userPosts = postList.filter((post) => post.author === uid);
      for (let i = 0; i < userPosts.length; i++) {
        const postComments = commentList.filter(
          (c) => c.postId === userPosts[i].id
        );
        for (let j = 0; j < postComments.length; j++) {
          const commentReplies = replyList.filter(
            (c) => c.parentId === postComments[j].id
          );
          postComments[j].replies = commentReplies;
        }
        userPosts[i].comments = postComments;
      }
      return Promise.resolve(userPosts.reverse());
    } catch (e) {
      return Promise.reject(statusInfo.fail.Unauthorized);
    }
  },

  createPost: async (post: CreatePostDto): Promise<QueryPostDto> => {
    if (!SigningState.uid) return Promise.reject(statusInfo.fail.Unauthorized);
    const newPost: QueryPostDto = {
      id: postState.nextPid,
      author: SigningState.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      slug: new Date().getTime().toString(),
      images: [],
      content: post.content,
      likenum: 0,
      mentions: [],
    };
    postList.push(newPost);
    postState.nextPid += 1;
    return newPost;
  },

  updatePost: async (post: UpdatePostDto): Promise<UpdatePostResponse> => {
    if (SigningState.uid !== post.author)
      return Promise.reject(statusInfo.fail.Unauthorized);
    const pidx = postList.findIndex((p) => p.id === post.id);
    postList[pidx] = { ...postList[pidx], ...post };
    return { count: 1 };
  },
  deletePost: async (pid): Promise<DeletePostResponse> => {
    if (!SigningState.uid) return Promise.reject(statusInfo.fail.Unauthorized);
    const pidx = postList.findIndex(
      (p) => p.id === pid && p.author === SigningState.uid
    );
    if (pidx === -1) return Promise.reject(statusInfo.fail.NotFound);
    postList.splice(pidx, 1);
    return { count: 1 };
  },
};

export default postTestApi;
