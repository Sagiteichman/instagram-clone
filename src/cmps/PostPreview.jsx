import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import LikeIcon from '../assets/svg/Like.jsx'
import CommentIcon from '../assets/svg/Comment.jsx'
import ShareIcon from '../assets/svg/Share.jsx'
import SaveIcon from '../assets/svg/Save.jsx'
import { PostMenu } from './PostOptions'
import { postService } from '../services/posts.service'
import { timeSince } from '../services/timeSince'
import { useSearchParams } from 'react-router-dom'
import { Author } from './Author.jsx'

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
  const [params, setParams] = useSearchParams()

  const openDetails = () => {
    params.append('postId', id)
    setParams(params)
  }

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
        <Author
          name={user?.name}
          imageUrl={user?.imageUrl || postImage}
          timestamp={timestamp}
        />
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
        <img onClick={openDetails} src={postImage} alt='Upload' />
      </div>
      <div className='post__footer'>
        <div className='post__footerIcons'>
          <div className='post__iconsMain'>
            <LikeIcon className='postIcon' />
            <CommentIcon className='postIcon' />
            <ShareIcon className='postIcon' />
          </div>
          <div className='post__iconsSave'>
            <SaveIcon className='postIcon' />
          </div>
        </div>
        {likes} likes
        <br />
        <br />
        {user?.name || 'Guest'}{' '}
        <span className='post__description'>{text}</span>
      </div>
    </div>
  )
}

export default PostPreview
