import React from 'react'
import { useSearchParams } from 'react-router-dom'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CommentFull from '../assets/svg/CommentFull.jsx'
import LikeIcon from '../assets/svg/Like.jsx'
import CommentIcon from '../assets/svg/Comment.jsx'
import { postService } from '../services/posts.service'

export function Explore({ posts, currentUser, updatePostLikes }) {
  const [params, setParams] = useSearchParams()

  const handlePostClick = (postId) => {
    params.set('postId', postId)
    setParams(params)
  }

  const handleLike = async (postId) => {
    if (currentUser && currentUser.id) {
      const updatedPost = await postService.updatePostLikes(
        postId,
        currentUser.id
      )
      updatePostLikes(postId, updatedPost.likes)
    }
  }

  const renderPosts = (postsToRender) => {
    return postsToRender.map((post) => {
      const isLiked = post.likes.includes(currentUser.id)
      const hasCommented = post.comments.some(
        (comment) => comment.userId === currentUser.id
      )

      return (
        <div
          key={post.id}
          className='explore-post'
          onClick={() => handlePostClick(post.id)}
        >
          <img src={post.postImage} alt='Post' />
          <div className='post-overlay'>
            <div className='post-icons'>
              <div
                className='post-icon'
                onClick={(e) => {
                  e.stopPropagation()
                  handleLike(post.id)
                }}
              >
                {isLiked ? <LikeFilled /> : <LikeIcon />}
                <span>{post.likes.length}</span>
              </div>
              <div className='post-icon'>
                {hasCommented ? <CommentFull /> : <CommentIcon />}
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='explore-page'>
      <div className='explore-content'>
        <div className='explore-posts'>{renderPosts(posts)}</div>
      </div>
    </div>
  )
}

export default Explore
