import React, { useEffect, useState } from 'react'
import { postService } from '../services/posts.service'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CommentFull from '../assets/svg/CommentFull.jsx'

export function Explore() {
  const [posts, setPosts] = useState([])
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const posts = await postService.getPosts()
    setPosts(posts)
  }

  const handlePostClick = (postId) => {
    params.set('postId', postId)
    setParams(params)
  }

  return (
    <div className='explore-page'>
      <div className='explore-content'>
        <div className='explore-posts'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='explore-post'
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

export default Explore
