import React, { useState, useEffect } from 'react'
import Suggestions from './Suggestions.jsx'
import PostPreview from './PostPreview.jsx'
import { postService } from '../services/posts.service.js'

export function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const posts = postService.getPosts()
    setPosts(posts)
  }, [])

  if (!posts.length) return <div>Loading Posts...</div>

  return (
    <div className='timeline'>
      <div className='timeline__left'>
        <div className='timeline__post'>
          {posts.map((post) => (
            <PostPreview
              key={post.id}
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      </div>
      <div className='timeline__right'>
        <Suggestions />
      </div>
    </div>
  )
}
