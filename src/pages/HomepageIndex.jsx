import React from 'react'
import { PostList } from '../cmps/PostList'

export function HomepageIndex({
  currentUser,
  posts,
  fetchPosts,
  user,
  setEditedPostId,
  updatePostLikes,
  updateCurrentUserSaved,
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
          updatePostLikes={updatePostLikes}
          updateCurrentUserSaved={updateCurrentUserSaved}
        />
      </div>
    </div>
  )
}
