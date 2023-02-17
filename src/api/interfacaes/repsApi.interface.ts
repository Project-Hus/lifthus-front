export interface RepsApi {
  get_user_reps: (user_id: string) => RepContent[];
  post_rep: (user_id: string, rep: RepContent) => boolean;
  update_rep: (user_id: string, rep_id: number, rep: RepContent) => boolean;
  delete_rep: (user_id: string, rep_id: number) => boolean;
}

export interface RepContent {
  rep_id?: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  username?: string;
  routine_id?: number;
  image_srcs?: string[];
  text: string;
}
