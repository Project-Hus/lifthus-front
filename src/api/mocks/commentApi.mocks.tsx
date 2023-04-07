import { CommentContent } from "../interfaces/commentApi.interface";

//make commentapi mock data
const comment_list: { [key: number]: CommentContent } = {
    1: {
        rep_id: 2,
        comment_id: 1,
        created_at: new Date("2023-01-03"),
        updated_at: new Date("2023-01-03"),
        user_id: "succregi",
        image_paths: [
            "https://i.pinimg.com/originals/f0/c9/84/f0c9842b43c97fb7412c8cd99ca5218d.jpg",
        ],
        text: "Hello I love powerlifting and British singer with a flow Ed Sheeran.",
        IsReply: false,
    },
    2: {
        rep_id: 1,
        comment_id: 2,
        created_at: new Date("2023-01-05"),
        updated_at: new Date("2023-01-05"),
        user_id: "succregi",
        text: "People fall in love in mysterious ways. maybe just a touch of a hand. Me I fall in love with you every single day.",
        IsReply: false,
    },
    3: {
        rep_id: 1,
        comment_id: 3,
        created_at: new Date("2023-01-05"),
        updated_at: new Date("2023-01-05"),
        user_id: "ramda",
        text: "People fall in love in mysterious ways. maybe just a touch of a hand. Me I fall in love with you every single day.",
        IsReply: false,
    },
}

export default comment_list;