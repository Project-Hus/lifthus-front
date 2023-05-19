export type CreatePostDto = {
  userGroup?: number;
  author: number;
  content: string;
};

export type UpdatePostDto = {
  id: number;
  author: number;
  content: string;
};
