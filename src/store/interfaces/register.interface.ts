export interface RegisterInfo {
  username?: string;
  registerType?: string;
  registerBodyWeight?: number;
  registerHeight?: number;
  registerSquat?: number;
  registerBenchpress?: number;
  registerDeadlift?: number;
}

export type RegisterNumberTypes =
  | "registerBodyWeight"
  | "registerHeight"
  | "registerSquat"
  | "registerBenchpress"
  | "registerDeadlift";

export type RegisterNumberType = {
  [key in RegisterNumberTypes]: number;
};

export type RegisterInfoStrings =
  | "username"
  | "registerType"
  | "registerBodyWeight"
  | "registerHeight"
  | "registerSquat"
  | "registerBenchpress"
  | "registerDeadlift";
