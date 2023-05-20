import { Uid } from "./userApi.interface";

export interface RepsApi {
  get_user_reps: ({ uid }: Uid) => Promise<RepContent[]>;
  getUserPosts: ({ username, skip }: GetUserPostsParams) => Promise<Post[]>;
  post_rep: ({ user_id, rep }: PostRepParams) => Promise<Uid>;
  update_rep: ({ user_id, rep_id, rep }: UpdateRepParams) => Promise<Uid>;
  delete_rep: ({ uid, pid }: DeleteRepParams) => Promise<Uid>;
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
  user_id: string;
  username?: string;
  routine_id?: number;
  image_srcs?: string[];
  text: string;
}
export interface PostRepParams {
  user_id: string;
  rep: RepContent;
}
export interface UpdateRepParams {
  user_id: string;
  rep_id: number;
  rep: RepContent;
}
export interface DeleteRepParams {
  uid: number;
  pid: number;
}
