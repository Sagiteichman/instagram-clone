import React from 'react'
import Suggestions from './Suggestions.jsx'
import PostPreview from './PostPreview.jsx'

export function PostList({
  currentUser,
  posts,
  fetchPosts,
  setEditedPostId,
  updatePostLikes,
}) {
  if (!posts.length) return <div>Loading Posts...</div>

  const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className='timeline'>
      <div className='timeline__left'>
        <div className='timeline__post'>
          {sortedPosts.map((post) => {
            if (!post.id) return <div>loading post...</div>
            return (
              <PostPreview
                key={post.id}
                fetchPosts={fetchPosts}
                setEditedPostId={setEditedPostId}
                currentUser={currentUser}
                updatePostLikes={updatePostLikes} // Pass the function here
                {...post}
              />
            )
          })}
        </div>
      </div>
      <div className='timeline__right'>
        <Suggestions />
      </div>
    </div>
  )
}
