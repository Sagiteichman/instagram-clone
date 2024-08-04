// cmps/PostPreview.jsx
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import LikeIcon from '../assets/svg/Like.jsx'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CommentIcon from '../assets/svg/Comment.jsx'
import ShareIcon from '../assets/svg/Share.jsx'
import SaveIcon from '../assets/svg/Save.jsx'
import Unsave from '../assets/svg/Unsave.jsx'
import { PostMenu } from './PostOptions'
import { postService } from '../services/posts.service'
import { userService } from '../services/users.service'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Author } from './Author.jsx'
import { AddComment } from './AddComment.jsx'

function PostPreview({
  id,
  userId,
  postImage,
  likes,
  timestamp,
  fetchPosts,
  comments,
  text = '',
  setEditedPostId,
  currentUser,
  updatePostLikes,
  updateCurrentUserSaved,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [params, setParams] = useSearchParams()
  const [localLikes, setLocalLikes] = useState(likes)
  const [isSaved, setIsSaved] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userService.getUserById(userId)
      setUser(fetchedUser)
    }
    fetchUser()
  }, [userId])

  useEffect(() => {
    setLocalLikes(likes)
    setIsSaved(currentUser?.saved.includes(id))
  }, [likes, currentUser?.saved, id])

  const openDetails = () => {
    params.append('postId', id)
    setParams(params)
  }

  const handleDelete = async () => {
    const result = await postService.deletePost(id)
    if (result.success) {
      fetchPosts()
      setIsMenuOpen(false)
    }
  }

  const handleEditClick = () => {
    setEditedPostId(id)
    setIsMenuOpen(false)
  }

  const handleLike = async () => {
    if (currentUser && currentUser.id) {
      const updatedPost = await postService.updatePostLikes(id, currentUser.id)
      setLocalLikes(updatedPost.likes)
      updatePostLikes(id, updatedPost.likes)
    }
  }

  const handleSaveToggle = async () => {
    if (currentUser && currentUser.id) {
      const action = isSaved ? 'unsavePost' : 'savePost'
      try {
        const updatedUser = await userService[action](currentUser.id, id)
        setIsSaved(!isSaved)
        updateCurrentUserSaved(updatedUser.saved)
      } catch (error) {
        console.error('Error saving post:', error)
      }
    }
  }

  const isLiked = currentUser ? localLikes.includes(currentUser.id) : false

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  if (!id || !user) return <div>Loading...</div>

  return (
    <div className='post'>
      <div className='post__header'>
        <Author
          name={user.name}
          imageUrl={user.imageUrl || postImage}
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
              <LikeFilled className='postIcon' onClick={handleLike} />
            ) : (
              <LikeIcon className='postIcon' onClick={handleLike} />
            )}
            <CommentIcon className='postIcon' />
            <ShareIcon className='postIcon' />
          </div>
          <div
            className='post__iconsSave'
            onClick={handleSaveToggle}
            style={{ cursor: 'pointer' }}
          >
            {isSaved ? (
              <Unsave className='postIcon' />
            ) : (
              <SaveIcon className='postIcon' />
            )}
          </div>
        </div>
        <div className='footer__description'>
          <span className='footer__likes'>
            {localLikes?.length > 0 &&
              `${localLikes.length} like${localLikes.length > 1 ? 's' : ''}`}
          </span>
          <div>
            <span
              className='footer__username'
              onClick={() => navigateToProfile(user.id)} // Navigate to user profile
              style={{ cursor: 'pointer' }}
            >
              {user?.name || 'Guest'}
            </span>
            <span className='post__description'>{text}</span>
          </div>
          {comments?.slice(0, 2)?.map((comment) => (
            <div
              className='footer__comments'
              key={comment.userId}
              onClick={() => navigateToProfile(comment.userId)} // Navigate to commenter's profile
              style={{ cursor: 'pointer' }}
            >
              {comment.user?.name}:
              <span className='post__comment'>{comment.text}</span>
            </div>
          ))}
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
  userId: PropTypes.string.isRequired,
  postImage: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  timestamp: PropTypes.string.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  text: PropTypes.string,
  setEditedPostId: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  updatePostLikes: PropTypes.func.isRequired,
  updateCurrentUserSaved: PropTypes.func.isRequired,
}

export default PostPreview
