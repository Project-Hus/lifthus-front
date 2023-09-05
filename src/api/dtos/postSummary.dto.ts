export class PostSummaryDto {
  id: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  slug: string;
  abstract: string;
  likesNum: number;
  commentsNum: number;
  clientLiked: boolean;
  constructor(pjson: PostSumamryJSON) {
    this.id = pjson.id;
    this.author = pjson.author;
    this.createdAt = new Date(pjson.createdAt);
    this.updatedAt = new Date(pjson.updatedAt);
    this.images = pjson.images;
    this.slug = pjson.slug;
    this.likesNum = pjson.likesNum;
    this.commentsNum = pjson.commentsNum;
    this.abstract = pjson.abstract;
    this.clientLiked = pjson.clientLiked;
  }
}

export type PostSumamryJSON = {
  id: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  slug: string;
  abstract: string;
  likesNum: number;
  commentsNum: number;
  clientLiked: boolean;
};
