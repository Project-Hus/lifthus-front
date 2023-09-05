export class PostDto {
  id: string;
  slug: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  content: string;
  likeNum: number;
  commentNum: number;
  private constructor(p: PostJSON) {
    this.id = p.id;
    this.slug = p.slug;
    this.author = p.author;
    this.createdAt = new Date(p.createdAt);
    this.updatedAt = new Date(p.updatedAt);
    this.images = p.images;
    this.content = p.content;
    this.likeNum = p.likeNum;
    this.commentNum = p.commentNum;
  }
}

export type PostJSON = {
  id: string;
  slug: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  content: string;
  likeNum: number;
  commentNum: number;
};

export class CreatePostDto {
  static create(post: CreatePostDtoInput): FormData {
    post.images = post.images || [];
    const newPostForm = new FormData();
    newPostForm.append("author", JSON.stringify(post.author));
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
  static create(post: UpdatePostDtoInput): FormData {
    const newPostForm = new FormData();
    newPostForm.append("id", JSON.stringify(post.id));
    newPostForm.append("author", JSON.stringify(post.author));
    newPostForm.append("content", post.content);
    return newPostForm;
  }
}

export type UpdatePostDtoInput = {
  id: string;
  author: string;
  content: string;
};

export type UpdatePostResponse = {
  count: number;
};

export type DeletePostResponse = {
  count: number;
};
