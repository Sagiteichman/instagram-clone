import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import LikeIcon from '../assets/svg/Like.jsx'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CommentIcon from '../assets/svg/Comment.jsx'
import ShareIcon from '../assets/svg/Share.jsx'
import SaveIcon from '../assets/svg/Save.jsx'
import { PostMenu } from './PostOptions'
import { postService } from '../services/posts.service'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Author } from './Author.jsx'
import { AddComment } from './AddComment.jsx'

function PostPreview({
  id,
  user,
  postImage,
  likes,
  timestamp,
  fetchPosts,
  comments,
  text = '',
  setEditedPostId,
  currentUser,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('PostPreview props:', {
      id,
      user,
      postImage,
      likes,
      timestamp,
      comments,
      text,
      currentUser,
    })
  }, [id, user, postImage, likes, timestamp, comments, text, currentUser])

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

  const isLiked = likes?.includes(currentUser?.id)

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  if (!id) return <div>loading...</div>
  return (
    <div className='post'>
      <div className='post__header'>
        <Author
          name={user?.name}
          imageUrl={user?.imageUrl || postImage}
          timestamp={timestamp}
          onClick={() => navigateToProfile(user.id)} // Navigate to user profile
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
            {isLiked ? (
              <LikeFilled className='postIcon' />
            ) : (
              <LikeIcon className='postIcon' />
            )}
            <CommentIcon className='postIcon' />
            <ShareIcon className='postIcon' />
          </div>
          <div className='post__iconsSave'>
            <SaveIcon className='postIcon' />
          </div>
        </div>
        <div className='foother__description'>
          <span className='footer__likes'>
            {likes?.length > 0 &&
              `${likes.length} like${likes.length > 1 ? 's' : ''}`}
          </span>
          <div>
            <span
              className='footer__username'
              onClick={() => navigateToProfile(user.id)} // Navigate to user profile
            >
              {user?.name || 'Guest'}
            </span>
            <span className='post__description'>{text}</span>
          </div>
          {comments?.slice(0, 2)?.map((comment) => {
            return (
              <div
                className='footer__comments'
                key={comment.userId}
                onClick={() => navigateToProfile(comment.userId)} // Navigate to commenter's profile
              >
                {comment.user?.name}:
                <span className='post__comment'>{comment.text}</span>
              </div>
            )
          })}
          {comments?.length > 0 && (
            <div onClick={openDetails}>
              <span className='footer__viewcomments'>
                View all {comments.length} comments
              </span>
            </div>
          )}
        </div>
      </div>
      <div>
        <AddComment
          postId={id}
          commenterId={currentUser?.id}
          fetchPosts={fetchPosts}
          comments={comments}
        />
      </div>
    </div>
  )
}

PostPreview.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  postImage: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  timestamp: PropTypes.string.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  text: PropTypes.string,
  setEditedPostId: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default PostPreview
