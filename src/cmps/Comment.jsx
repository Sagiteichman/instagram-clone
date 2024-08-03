import React from 'react'
import { Avatar } from '@mui/material'
import { timeSince } from '../services/timeSince'
import { useNavigate } from 'react-router-dom'

export const Comment = ({ comment }) => {
  const navigate = useNavigate()

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <div className='comment'>
      <Avatar
        src={comment.user?.imageUrl}
        alt={comment.user?.name}
        onClick={() => navigateToProfile(comment.user?.id)} // Navigate to user profile
        style={{ cursor: 'pointer' }} // Add pointer cursor style
      />
      <div className='comment_name_and_text'>
        <div className='comment__textarea'>
          <span
            className='comment__username'
            onClick={() => navigateToProfile(comment.user?.id)} // Navigate to user profile
            style={{ cursor: 'pointer' }} // Add pointer cursor style
          >
            {comment.user?.name}
          </span>
          <span className='comment__comment'>{comment.text}</span>
        </div>
        <span>{comment.likes > 0 && comment.likes + ' likes'}</span>
        <div>
          <span className='comment__text'>{timeSince(comment.timestamp)} </span>
          <span className='comment__text'>Reply</span>
        </div>
      </div>
    </div>
  )
}
