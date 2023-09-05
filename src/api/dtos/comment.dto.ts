export type QueryCommentDto = {
  id: string;
  postId: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likesNum: number;
  replies?: QueryReplyDto[];
};

export type QueryReplyDto = {
  id: string;
  postId: string;
  parentId: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likesNum: number;
  replies?: QueryReplyDto[];
};

export type CreateCommentDto = {
  postId: string;
  author: string;
  content: string;
};

export type CreateReplyDto = {
  parentId: string;
  author: string;
  content: string;
};

export type UpdateCommentDto = {
  id: string;
  author: string;
  content: string;
};

export type UpdateCommentResponse = {
  count: number;
};

export type DeleteCommentResponse = {
  count: number;
};
