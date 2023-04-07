import React from 'react'
import { CommentContent } from '../../../../api/interfaces/commentApi.interface'
import { Box } from '@chakra-ui/layout'
import Comment from './comment'
import { Input } from '@chakra-ui/react'
import CommentEdit from './commentCreate'
import useUserStore from '../../../../store/user.zustand'

const CommentList = ({ data }: { data: CommentContent[] }) => {
  const { user_id } = useUserStore();

  const comments = data
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



