import React, { useEffect, useState } from 'react'
import { postService } from '../services/posts.service.js'
import { userService } from '../services/users.service.js'
import { useSearchParams } from 'react-router-dom'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CommentFull from '../assets/svg/CommentFull.jsx'

export function ProfilePage() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    fetchUser()
    fetchPosts()
  }, [])

  const fetchUser = async () => {
    const user = await userService.getUserById('1') // Needs to be replaced with dynamic user ID
    setUser(user)
  }

  const fetchPosts = async () => {
    const posts = await postService.getPosts()
    const userPosts = posts.filter((post) => post.user.id === '1') // Needs to be replaced with dynamic user ID
    setPosts(userPosts)
  }

  const handlePostClick = (postId) => {
    params.set('postId', postId)
    setParams(params)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className='profile-page'>
      <div className='profile-content'>
        <div className='profile-header'>
          <img src={user.imageUrl} alt={user.name} className='profile-avatar' />
          <div className='profile-info'>
            <h2>{user.name}</h2>
            <div className='profile-stats'>
              <span>{posts.length} posts</span>
              {/* Add followers and following count */}
            </div>
          </div>
        </div>
        <div className='profile-posts'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='profile-post'
              onClick={() => handlePostClick(post.id)}
            >
              <img src={post.postImage} alt='Post' />
              <div className='post-overlay'>
                <div className='post-icons'>
                  <div className='post-icon'>
                    <LikeFilled />
                    <span>{post.likes.length}</span>
                  </div>
                  <div className='post-icon'>
                    <CommentFull />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
