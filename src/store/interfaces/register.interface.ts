export interface RegisterInfo {
  registerUsername?: string;
  registerType?: string;
  registerBodyWeight?: number;
  registerHeight?: number;
  registerSquat?: number;
  registerBenchpress?: number;
  registerDeadlift?: number;
}

export type RegisterInfoStrings =
  | "registerUsername"
  | "registerType"
  | "registerBodyWeight"
  | "registerHeight"
  | "registerSquat"
  | "registerBenchpress"
  | "registerDeadlift";
