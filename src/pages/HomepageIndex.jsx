import React from 'react'
import { PostList } from '../cmps/PostList'

export function HomepageIndex({
  currentUser,
  posts,
  fetchPosts,
  user,
  setEditedPostId,
  updatePostLikes, // Receive the function here
}) {
  if (!posts || !posts.length) return <div>loading posts...</div>
  return (
    <div className='homepage'>
      <div className='homepage__timeline'>
        <PostList
          posts={posts}
          fetchPosts={fetchPosts}
          currentUser={currentUser}
          user={user}
          setEditedPostId={setEditedPostId}
          updatePostLikes={updatePostLikes} // Pass the function here
        />
      </div>
    </div>
  )
}
