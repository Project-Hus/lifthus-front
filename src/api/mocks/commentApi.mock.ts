import { QueryCommentDto, QueryReplyDto } from "../dtos/comment.dto";

export let next_cid = 103;

/**
 * replyList
 *
 * the key is the parent comment id,
 */
const replyList: { [key: number]: QueryReplyDto[] } = {
  100: [
    {
      id: 102,
      parentId: 100,
      author: 100,
      createdAt: new Date("2023-01-03"),
      updatedAt: new Date("2023-01-03"),
      content: "This is the reply",
      likenum: 3,
      mentions: [],
    },
  ],
};

/**
 * commentList
 *
 * the key is the post id
 */
const commentList: { [key: number]: QueryCommentDto[] } = {
  100: [
    {
      id: 100,
      postId: 100,
      author: 100,
      createdAt: new Date("2023-01-03"),
      updatedAt: new Date("2023-01-03"),
      content:
        "Hello I love powerlifting and British singer with a flow Ed Sheeran.",
      likenum: 5,
      mentions: [],
      replies: replyList[100],
    },
    {
      id: 101,
      postId: 100,
      author: 100,
      createdAt: new Date("2023-01-03"),
      updatedAt: new Date("2023-01-03"),
      content:
        "People fall in love in mysterious ways. maybe just a touch of a hand. Me I fall in love with you every single day.",
      likenum: 5,
      mentions: [],
      replies: [],
    },
  ],
};

export default commentList;
