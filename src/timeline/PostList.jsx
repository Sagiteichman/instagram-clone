import React, { useState } from 'react'
import Sugesstions from './Sugesstions.jsx'
import PostPreview from './posts/PostPreview.jsx'

export function PostList() {
  const [posts, setPosts] = useState([
    {
      user: 'Jude',
      postImage: '../src/images/JudeBellingham.png',
      likes: 43,
      timestamp: '2d',
    },
    {
      user: 'Modrich',
      postImage: '../images/lukaModrich.png',
      likes: 51,
      timestamp: '1w',
    },
    {
      user: 'Kross',
      postImage: '../src/images/ToniKross.png',
      likes: 108,
      timestamp: '4d',
    },
    {
      user: 'Valverde',
      postImage: '../src/images/ToniKross.png',
      likes: 108,
      timestamp: '4h',
    },
  ])

  if (!posts || !posts.length) return <div>loading Post</div>
  return (
    <div className='timeline'>
      <div className='timeline__left'>
        <div className='timeline__post'>
          {posts.map((post) => (
            <PostPreview
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      </div>
      <div className='timeline__right'>
        <Sugesstions />
      </div>
    </div>
  )
}
