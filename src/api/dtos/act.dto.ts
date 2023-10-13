export type QueryActDto = {
  code: string;
  actType: string;
  name: string;
  author: string;
  createdAt: string;
  versions: QueryActVersionDto[];
};

export type QueryActVersionDto = {
  code: string;
  version: number;
  imageSrcs: string[];
  text: string;
  createdAt: string;
};

export type CreateActDto = {
  actType: string;
  name: string;
  author: string;
  text: string;
  imageSrcs: string[];
};
