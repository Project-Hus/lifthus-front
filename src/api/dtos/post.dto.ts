export type CreatePostDto = {
  userGroup?: PrimaryKey;
  author: PrimaryKey;
  content: string;
};

export type UpdatePostDto = {
  id: PrimaryKey;
  author: PrimaryKey;
  content: string;
};
