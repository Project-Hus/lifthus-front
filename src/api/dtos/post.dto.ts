export class PostDto {
  id: string;
  slug: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  imageSrcs: string[];
  content: string;
  likesNum: number;
  commentsNum: number;
  clientLiked: boolean;
  constructor(p: PostJSON) {
    this.id = String(p.id);
    this.slug = p.slug;
    this.author = p.author;
    this.createdAt = new Date(p.createdAt);
    this.updatedAt = new Date(p.updatedAt);
    this.imageSrcs = p.imageSrcs;
    this.content = p.content;
    this.likesNum = p.likesNum;
    this.commentsNum = p.commentsNum;
    this.clientLiked = p.clientLiked;
  }
}

export type PostJSON = {
  id: string;
  slug: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  imageSrcs: string[];
  content: string;
  likesNum: number;
  commentsNum: number;
  clientLiked: boolean;
};

export class CreatePostDto {
  static create(post: CreatePostDtoInput): FormData {
    post.images = post.images || [];
    const newPostForm = new FormData();
    newPostForm.append("author", post.author);
    newPostForm.append("content", post.content);
    for (const img of post.images) {
      newPostForm.append("images", img);
    }
    return newPostForm;
  }
}

export type CreatePostDtoInput = {
  author: string;
  images?: File[];
  content: string;
};

export class UpdatePostDto {
  public id: string;
  public author: string;
  public content: string;
  constructor(p: UpdatePostDtoInput) {
    this.id = p.id;
    this.author = p.author;
    this.content = p.content;
  }
}

export type UpdatePostDtoInput = {
  id: string;
  author: string;
  content: string;
};

export type DeletePostResponse = {
  count: number;
};
