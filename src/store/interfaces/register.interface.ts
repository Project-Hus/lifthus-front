export interface register_info {
  register_nickname?: string;
  register_type?: string;
  register_bodyweight?: number;
  register_height?: number;
  register_squat?: number;
  register_benchpress?: number;
  register_deadlift?: number;
}

export type register_info_strings =
  | "register_nickname"
  | "register_type"
  | "register_bodyweight"
  | "register_height"
  | "register_squat"
  | "register_benchpress"
  | "register_deadlift";
