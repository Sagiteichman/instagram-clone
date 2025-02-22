import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Comment } from './Comment'
import { AddComment } from './AddComment'
import { timeSince } from '../services/timeSince'

// icons
import LikeIcon from '../assets/svg/Like.jsx'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CommentIcon from '../assets/svg/Comment.jsx'
import ShareIcon from '../assets/svg/Share.jsx'
import SaveIcon from '../assets/svg/Save.jsx'
import Unsave from '../assets/svg/Unsave.jsx'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { postService } from '../services/posts.service'
import { userService } from '../services/users.service'

export const PostDetails = ({
  selectedPost,
  currentUser,
  fetchPosts,
  updatePostLikes,
  updatePostComments,
  updateCurrentUserSaved,
}) => {
  const [params, setParams] = useSearchParams()
  const [localLikes, setLocalLikes] = useState(selectedPost?.likes || [])
  const [localComments, setLocalComments] = useState(
    selectedPost?.comments || []
  )
  const [isSaved, setIsSaved] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLocalLikes(selectedPost?.likes || [])
    setLocalComments(selectedPost?.comments || [])
    setIsSaved(currentUser?.saved.includes(selectedPost.id))
  }, [selectedPost, currentUser?.saved])

  const closeModal = () => {
    params.delete('postId')
    setParams(params)
    fetchPosts() // Ensure posts are fetched when modal is closed
  }

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  const handleLike = async () => {
    if (currentUser && currentUser.id) {
      const updatedPost = await postService.updatePostLikes(
        selectedPost.id,
        currentUser.id
      )
      setLocalLikes(updatedPost.likes)
      updatePostLikes(selectedPost.id, updatedPost.likes)
    }
  }

  const handleSaveToggle = async () => {
    if (currentUser && currentUser.id) {
      const action = isSaved ? 'unsavePost' : 'savePost'
      const updatedUser = await userService[action](
        currentUser.id,
        selectedPost.id
      )
      setIsSaved(!isSaved)
      updateCurrentUserSaved(updatedUser.saved)
    }
  }

  const handleAddComment = async (commentText) => {
    if (currentUser && currentUser.id) {
      const updatedPost = await postService.addComment(
        selectedPost.id,
        currentUser.id,
        commentText
      )
      setLocalComments(updatedPost.comments)
      updatePostComments(selectedPost.id, updatedPost.comments)
    }
  }

  const isLiked = currentUser ? localLikes.includes(currentUser.id) : false

  if (!selectedPost) return null

  return (
    <>
      {selectedPost && (
        <div className='postDetailsModal'>
          <div onClick={closeModal} className='postDetailsOverlay'></div>
          <div className='postDetailsContent'>
            <div className='postDetailsImage'>
              <img src={selectedPost.postImage} alt='Selected' />
            </div>
            <div className='postDetailsComments'>
              <div className='postDetailsHeader'>
                <img
                  className='avatar'
                  src={selectedPost?.user?.imageUrl}
                  alt={selectedPost?.user?.name}
                  onClick={() => navigateToProfile(selectedPost?.user?.id)}
                  style={{ cursor: 'pointer' }}
                />
                <span
                  className='username'
                  onClick={() => navigateToProfile(selectedPost?.user?.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {selectedPost?.user?.name || 'guest'}
                </span>
                <MoreHorizIcon className='moreIcon' />
              </div>
              <div className='commentsSection'>
                {localComments.map((comment, i) => (
                  <div key={i} className='commentWrapper'>
                    <Comment comment={comment} />
                  </div>
                ))}
              </div>
              <div className='addCommentWrapper'>
                <div className='postActions'>
                  <div className='iconsRow'>
                    <div className='leftIcons'>
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
                  <div className='likes'>
                    <span className='bold'>{localLikes.length} Likes</span>
                  </div>
                  <div className='timestamp'>
                    {timeSince(selectedPost?.timestamp).toLocaleString()}
                  </div>
                </div>
                <AddComment
                  commenterId={currentUser.id}
                  comments={localComments}
                  postId={selectedPost.id}
                  fetchPosts={fetchPosts}
                  showPostButton={true}
                  addComment={handleAddComment}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
