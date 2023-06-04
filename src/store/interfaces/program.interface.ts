export interface programDB {
  id: number;
  author: number;
  created_at: Date;
  updated_at: Date;
  tag: string[];
  images?: string[];
  description: string;
  likenum: number;
  starnum: number;
  name: string;
  weeks: week[];
  days: day[];
  acts: act[];
}
export interface actDB {
  id: number;
  name: string;
  author: number;
  created_at: Date;
  updated_at: Date;
  tag: string[];
  images: string[];
  description: string;
  bodyPart?: string[];
  order: number;
  type: string;
}
interface day {
  dayNum: number; //월 화 수 목 금 토 일 1 2 3 4 5 6 7
  week: number;
}

export interface week {
  weeknum: number;
}
export interface act {
  week: number;
  dayNum: number;
  actDB: actDB;
}
