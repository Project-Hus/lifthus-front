import React from 'react'
import { CommentContent } from '../../../../api/interfaces/commentApi.interface'
import { Box } from '@chakra-ui/layout'
import Comment from './comment'

const CommentList = ({ data }: { data: { [key: number]: CommentContent } }) => {
  const comments = Object.values(data);
  const comment_list = []
  for (const comment of comments) {
    comment_list.push(<Comment comment={comment}></Comment>);
  }
  return (
    <>
      <Box>
        {comment_list}
      </Box>

    </>
  )

}

export default CommentList;



