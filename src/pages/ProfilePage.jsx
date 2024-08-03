import React, { useEffect, useState } from 'react'
import { postService } from '../services/posts.service.js'
import { userService } from '../services/users.service.js'
import { useParams, useSearchParams } from 'react-router-dom'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CommentFull from '../assets/svg/CommentFull.jsx'
import ShowSaved from '../assets/svg/ShowSaved.jsx'
import ShowUploaded from '../assets/svg/ShowUploaded.jsx'
import ShowTagged from '../assets/svg/ShowTagged.jsx'
import LikeIcon from '../assets/svg/Like.jsx'
import CommentIcon from '../assets/svg/Comment.jsx'

export function ProfilePage({ updatePostLikes, updatePostComments }) {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([]) // New state for saved posts
  const [tab, setTab] = useState('POSTS') // State to manage selected tab
  const [params, setParams] = useSearchParams()
  const { userId } = useParams() // Get userId from URL parameters

  useEffect(() => {
    if (userId) {
      fetchUser(userId)
      fetchPosts(userId)
    }
  }, [userId])

  useEffect(() => {
    // Reset the tab to 'POSTS' whenever the userId changes
    setTab('POSTS')
  }, [userId])

  const fetchUser = async (id) => {
    const user = await userService.getUserById(id)
    setUser(user)
    if (user.saved) {
      const allPosts = await postService.getPosts()
      const savedPosts = allPosts.filter((post) => user.saved.includes(post.id))
      setSavedPosts(savedPosts)
    }
  }

  const fetchPosts = async (id) => {
    const posts = await postService.getPosts()
    const userPosts = posts.filter((post) => post.user.id === id)
    setPosts(userPosts)
  }

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
      const isLiked = post.likes.includes(user.id)
      const hasCommented = post.comments.some(
        (comment) => comment.userId === user.id
      )

      return (
        <div
          key={post.id}
          className='profile-post'
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

  if (!user) return <div>Loading...</div>

  return (
    <div className='profile-page'>
      <div className='profile-content'>
        <div className='profile-header'>
          <img src={user.imageUrl} alt={user.name} className='profile-avatar' />
          <div className='profile-info'>
            <div className='profile-header-top'>
              <h2>{user.name}</h2>
              {user.id === '1' && ( // Show buttons only for user.id === '1'
                <>
                  <button className='edit-profile-btn'>Edit Profile</button>
                  <button className='view-archive-btn'>View Archive</button>
                </>
              )}
            </div>
            <div className='profile-stats'>
              <span>
                <span className='number'>{posts.length}</span> posts
              </span>
              <span>
                <span className='number'>{user.followers}</span> followers
              </span>
              <span>
                <span className='number'>{user.following}</span> following
              </span>
            </div>
            <div className='profile-details'>
              <span className='fullname'>{user.fullname}</span>
              <p className='bio'>{user.bio}</p>
            </div>
          </div>
        </div>
        <div className='profile-tabs'>
          <button
            className={`tab-button ${tab === 'POSTS' ? 'active' : ''}`}
            onClick={() => setTab('POSTS')}
          >
            <ShowUploaded />
            POSTS
          </button>
          <button
            className={`tab-button ${tab === 'SAVED' ? 'active' : ''}`}
            onClick={() => setTab('SAVED')}
          >
            <ShowSaved />
            SAVED
          </button>
          <button
            className={`tab-button ${tab === 'TAGGED' ? 'active' : ''}`}
            onClick={() => setTab('TAGGED')}
          >
            <ShowTagged />
            TAGGED
          </button>
        </div>
        <div className='profile-posts'>
          {tab === 'POSTS' && renderPosts(posts)}
          {tab === 'SAVED' && renderPosts(savedPosts)}
          {tab === 'TAGGED' && (
            <div>Tagged posts functionality not implemented yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
