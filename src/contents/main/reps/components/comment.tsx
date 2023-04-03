import { CommentContent } from "../../../../api/interfaces/commentApi.interface"
import { Card } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { Text } from "@chakra-ui/layout"
const Comment = ({ comment }: { comment: CommentContent }) => {

    const CommentBoard = styled.div`
  border: 2px solid black;
  border-radius: 5px;
    padding: 10px;

`;
    const user_id = comment.user_id
    const created_at = comment.created_at
    return (
        <CommentBoard>
            <Card>

                <Text as="b">{user_id}-{created_at.toString()}-</Text>


                <br />
                <Text>{comment.text}</Text>
            </Card>
        </CommentBoard>
    )
}



export default Comment