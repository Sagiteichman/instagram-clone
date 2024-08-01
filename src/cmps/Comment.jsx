import { Avatar } from '@mui/material'
import { timeSince } from '../services/timeSince'

export const Comment = ({ comment }) => {
  return (
    <div className='comment'>
      <Avatar src={comment.user?.imageUrl} alt={comment.user?.name} />
      <div className='comment_name_and_text'>
        <div className='comment__textarea'>
          <span className='comment__username'>{comment.user?.name}</span>
          <span className='comment__comment'>{comment.text}</span>
        </div>
        <span>{comment.likes > 0 && comment.likes + 'likes'}</span>
        <div>
          <span className='comment__text'>{timeSince(comment.timestamp)} </span>
          <span className='comment__text'>Reply</span>
        </div>
      </div>
    </div>
  )
}
