import { PostDto, PostJSON } from "./post.dto";

export class PostSummaryDto extends PostDto {
  constructor(pjson: PostSumamryJSON) {
    const pj: PostJSON = {
      id: pjson.id,
      author: pjson.author,
      createdAt: pjson.createdAt,
      updatedAt: pjson.updatedAt,
      images: pjson.images,
      slug: pjson.slug,
      likesNum: pjson.likesNum,
      commentsNum: pjson.commentsNum,
      content: pjson.abstract,
      clientLiked: pjson.clientLiked,
    };
    super(pj);
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
