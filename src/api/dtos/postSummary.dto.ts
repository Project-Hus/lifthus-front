import { QueryCommentDto } from "./comment.dto";

export class PostSummaryDto {
  id: number;
  author: number;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  slug: string;
  abstract: string;
  likeNum: number;
  commentNum: number;
  constructor(pjson: PostSumamryJSON) {
    const slug = pjson.slug;
    const decSlug = decodeURIComponent(slug);
    const codeIdx = slug.lastIndexOf("code");
    this.id = pjson.id;
    this.author = pjson.author;
    this.createdAt = new Date(pjson.createdAt);
    this.updatedAt = new Date(pjson.updatedAt);
    this.images = pjson.images;
    this.slug = pjson.slug;
    this.likeNum = pjson.likeNum;
    this.commentNum = pjson.commentNum;
    if (codeIdx === -1) this.abstract = decSlug;
    else this.abstract = decSlug.slice(0, codeIdx);
  }
}

export type PostSumamryJSON = {
  id: number;
  author: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
  slug: string;
  likeNum: number;
  commentNum: number;
};
