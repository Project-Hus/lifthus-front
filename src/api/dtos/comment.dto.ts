export class CommentDto {
  id: string;

  author: string;

  postId: string;
  parentId?: string;

  content: string;

  createdAt: Date;
  updatedAt: Date;

  likesNum: number;

  replies?: CommentDto[];
  constructor(c: CommentJSON) {
    this.id = c.id;
    this.author = c.author;
    this.postId = c.postId;
    this.parentId = c.parentId;
    this.content = c.content;
    this.createdAt = new Date(c.createdAt);
    this.updatedAt = new Date(c.updatedAt);
    this.likesNum = c.likesNum;
    this.replies = c.replies?.map((r) => new CommentDto(r));
  }
}

export type CommentJSON = {
  id: string;

  author: string;

  postId: string;
  parentId?: string;

  content: string;

  createdAt: string;
  updatedAt: string;

  likesNum: number;

  replies?: CommentJSON[];
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
