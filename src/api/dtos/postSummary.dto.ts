export class PostSummaryDto {
  id: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  slug: string;
  abstract: string;
  likeNum: number;
  commentNum: number;
  constructor(pjson: PostSumamryJSON) {
    this.id = pjson.id;
    this.author = pjson.author;
    this.createdAt = new Date(pjson.createdAt);
    this.updatedAt = new Date(pjson.updatedAt);
    this.images = pjson.images;
    this.slug = pjson.slug;
    this.likeNum = pjson.likeNum;
    this.commentNum = pjson.commentNum;
    this.abstract = pjson.abstract;
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
  likeNum: number;
  commentNum: number;
};
