import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import TelegramIcon from '@mui/icons-material/Telegram'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { PostMenu } from './PostOptions'
import { postService } from '../services/posts.service'
import { timeSince } from '../services/timeSince'

function PostPreview({
  id,
  user,
  postImage,
  likes,
  timestamp,
  fetchPosts,
  text = '',
  setEditedPostId,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleDelete = async () => {
    console.log('delete post', id)
    const result = await postService.deletePost(id)
    if (result.success) {
      fetchPosts()
      console.log('post deleted', result)
      setIsMenuOpen(false)
    } else {
      console.log('error deleting post', result)
    }
  }

  const handleEditClick = () => {
    setEditedPostId(id)
    setIsMenuOpen(false)
  }
  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__headerAuthor'>
          <Avatar src={user?.imageUrl || postImage} alt={user?.name || 'Guest'}>
            {!postImage && user.charAt(0).toUpperCase()}
          </Avatar>
          {user?.name || 'Guest'} • <span>{timeSince(timestamp)}</span>
        </div>
        <MoreHorizIcon onClick={() => setIsMenuOpen((isOpen) => !isOpen)} />
        {isMenuOpen && (
          <PostMenu
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            onDeleteClick={handleDelete}
            onEditClick={handleEditClick}
          />
        )}
      </div>
      <div className='post__image'>
        <img src={postImage} alt='Upload Image' />
      </div>
      <div className='post__footer'>
        <div className='post__footerIcons'>
          <div className='post__iconsMain'>
            <FavoriteBorderIcon className='postIcon' />
            <ChatBubbleOutlineIcon className='postIcon' />
            <TelegramIcon className='postIcon' />
          </div>
          <div className='post__iconsSave'>
            <BookmarkBorderIcon className='postIcon' />
          </div>
        </div>
        {likes} likes
        <br />
        <br />
        {user?.name || 'Guest'} {text}
      </div>
    </div>
  )
}

export default PostPreview
