export interface RepsApi {
  get_user_reps: (user_id: string) => Rep[];
  post_rep: (user_id: string, rep: Rep) => boolean;
  update_rep: (user_id: string, rep_id: number, rep: Rep) => boolean;
  delete_rep: (user_id: string, rep_id: number) => boolean;
}

export interface Rep {
  rep_id?: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  username: string;
  routine_id?: number;
  image_paths?: string[];
  text: string;
}
