import React, { useState } from 'react'

import Suggestions from './Suggestions.jsx'
import PostPreview from './PostPreview.jsx'

import {
  DEMO_PHOTO_URL,
  DEMO_PHOTO_URL_2,
  DEMO_PHOTO_URL_3,
  DEMO_PHOTO_URL_4,
} from '../services/demo.data.service.js'

export function PostList() {
  const [posts, setPosts] = useState([
    {
      user: 'Jude',
      postImage: DEMO_PHOTO_URL,
      likes: 43,
      timestamp: '2d',
    },
    {
      user: 'Valverde',
      postImage: DEMO_PHOTO_URL_2,
      likes: 108,
      timestamp: '4h',
    },
    {
      user: 'Modrich',
      postImage: DEMO_PHOTO_URL_3,
      likes: 51,
      timestamp: '1w',
    },
    {
      user: 'Kross',
      postImage: DEMO_PHOTO_URL_4,
      likes: 108,
      timestamp: '4d',
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
        <Suggestions />
      </div>
    </div>
  )
}
