import React from 'react'
import { PostList } from '../cmps/PostList'

export function HomepageIndex({ posts, fetchPosts, user, setEditedPostId }) {
  return (
    <div className='homepage'>
      <div className='homepage__timeline'>
        <PostList
          posts={posts}
          fetchPosts={fetchPosts}
          user={user}
          setEditedPostId={setEditedPostId}
        />
      </div>
    </div>
  )
}
