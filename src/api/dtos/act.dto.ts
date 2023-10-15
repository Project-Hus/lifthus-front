export type QueryActDto = {
  code: string;
  author: string;
  actType: string;
  name: string;
  text: string;
  imageSrcs: string[];
  createdAt: string;
  standard: boolean;
};

export type CreateActDto = {
  actType: string;
  name: string;
  author: string;
  text: string;
  imageSrcs: string[];
};

export type UpdateActRequestDto = {
  actCode: string;
  text?: string;
  imageSrcs?: string[];
};
