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
        onClick={() => navigateToProfile(comment.user?.id)}
        style={{ cursor: 'pointer' }}
        className='comment-avatar'
      />
      <div className='comment-content'>
        <div className='comment-header'>
          <span
            className='comment-username'
            onClick={() => navigateToProfile(comment.user?.id)}
            style={{ cursor: 'pointer' }}
          >
            {comment.user?.name}
          </span>
          <span className='comment-text'>{comment.text}</span>
        </div>
        <div className='comment-footer'>
          <span className='comment-timestamp'>
            {timeSince(comment.timestamp)}
          </span>
          {comment.likes > 0 && (
            <span className='comment-likes'>{comment.likes} likes</span>
          )}
          <span className='comment-reply'>Reply</span>
        </div>
      </div>
    </div>
  )
}
