export type QueryCommentDto = {
  id: number;
  postId: number;
  author: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likenum: number;
  mentions?: string[];
  replies?: QueryReplyDto[];
};

export type QueryReplyDto = {
  id: number;
  parentId: number;
  author: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likenum: number;
  mentions?: string[];
};

export type CreateCommentDto = {
  postId: number;
  author: number;
  content: string;
};

export type CreateReplyDto = {
  parentId: number;
  author: number;
  content: string;
};

export type UpdateCommentDto = {
  id: number;
  author: number;
  content: string;
};

export type UpdateCommentResponse = {
  count: number;
};

export type DeleteCommentResponse = {
  count: number;
};
