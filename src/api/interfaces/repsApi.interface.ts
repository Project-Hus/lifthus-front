import { UserId } from "./userApi.interface";

export interface RepsApi {
  get_user_reps: ({ user_id }: UserId) => Promise<RepContent[]>;
  post_rep: ({ user_id, rep }: PostRepParams) => Promise<UserId>;
  update_rep: ({ user_id, rep_id, rep }: UpdateRepParams) => Promise<UserId>;
  delete_rep: ({ user_id, rep_id }: DeleteRepParams) => Promise<UserId>;
}
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
  user_id: number;
  rep_id: number;
  rep: RepContent;
}
export interface DeleteRepParams {
  user_id: string;
  rep_id: number;
}
