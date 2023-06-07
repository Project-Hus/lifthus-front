export type QueryActDto = {
  id: number;
  name: string;
  slug: string;
  type: string;
  author: number;
  image?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  weight: boolean;
  bodyweight: boolean;
  cardio: boolean;
  upper: boolean;
  lower: boolean;
  arms: boolean;
  shoulders: boolean;
  chest: boolean;
  core: boolean;
  upper_back: boolean;
  lower_back: boolean;
  glute: boolean;
  legs_front: boolean;
  legs_back: boolean;
  etc: boolean;
  edges: {
    tags: QueryTagDto[];
  };
};

type QueryTagDto = {
  id: number;
  name: string;
};

export type CreateActDto = {
  name: string;
  type: string;

  author: number;
  image?: string;
  description?: string;

  tags: string[];

  weight: boolean;
  bodyweight: boolean;
  cardio: boolean;

  upper: boolean;
  lower: boolean;
  full: boolean;

  arms: boolean;
  shoulders: boolean;
  chest: boolean;
  core: boolean;
  upper_back: boolean;
  lower_back: boolean;
  glute: boolean;
  legs_front: boolean;
  legs_back: boolean;
  etc: boolean;
};
