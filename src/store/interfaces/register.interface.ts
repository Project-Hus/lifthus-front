export interface RegisterInfo {
  username?: string;
  type?: string;
  bodyWeight?: number;
  height?: number;
  squat?: number;
  benchpress?: number;
  deadlift?: number;
}

export type RegisterNumberTypes =
  | "bodyWeight"
  | "height"
  | "squat"
  | "benchpress"
  | "deadlift";

export type RegisterNumberType = {
  [key in RegisterNumberTypes]: number;
};

export type RegisterInfoStrings =
  | "username"
  | "type"
  | "bodyWeight"
  | "height"
  | "squat"
  | "benchpress"
  | "deadlift";
