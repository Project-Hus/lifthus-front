export type QueryPostDto = {
  id: number;
  author: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  images: string[];
  content: string;
  likenum: number;
};

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
