import { Avatar } from '@mui/material'
import React from 'react'
import './PostPreview.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutLineIcon from '@mui/icons-material/ChatBubbleOutline'
import TelegramIcon from '@mui/icons-material/Telegram'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { DEMO_PHOTO_URL } from '../../services/feedpost.service'

function PostPreview({ user, postImage, likes, timestamp }) {
  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__headerAuthor'>
          <Avatar>{user.charAt(0).toUpperCase() || 'empty'}</Avatar>
          {user}• <span>{timestamp}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className='post__image'>
        <img src={DEMO_PHOTO_URL} alt='Upload Image' />
      </div>
      <div className='post__footer'>
        <div className='post__footerIcons'>
          <div className='post__iconsMain'>
            <FavoriteBorderIcon className='postIcon' />
            <ChatBubbleOutLineIcon className='postIcon' />
            <TelegramIcon className='postIcon' />
          </div>
          <div className='post__iconsSave'>
            <BookmarkBorderIcon className='postIcon' />
          </div>
        </div>
        Liked by {likes} people
      </div>
    </div>
  )
}

export default PostPreview
