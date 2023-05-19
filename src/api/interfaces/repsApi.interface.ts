import { UserId, UserName } from "./userApi.interface";

export interface RepsApi {
  get_user_reps: ({ user_id }: UserId) => Promise<RepContent[]>;
  getUserPosts: ({ username, skip }: GetUserPostsParams) => Promise<Post[]>;
  post_rep: ({ user_id, rep }: PostRepParams) => Promise<UserId>;
  update_rep: ({ user_id, rep_id, rep }: UpdateRepParams) => Promise<UserId>;
  delete_rep: ({ uid, pid }: DeleteRepParams) => Promise<UserId>;
}

export type Post = {
  id: number;
  created_at: Date;
  updated_at: Date;
  aid: number;
  image: string;
  content: string;
};

export type GetUserPostsParams = {
  username: string;
  skip?: number;
};
export interface RepContent {
  rep_id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  username?: string;
  routine_id?: number;
  image_srcs?: string[];
  text: string;
}
export interface PostRepParams {
  user_id: number;
  rep: RepContent;
}
export interface UpdateRepParams {
  user_id: number;
  rep_id: number;
  rep: RepContent;
}
export interface DeleteRepParams {
  uid: number;
  pid: number;
}
