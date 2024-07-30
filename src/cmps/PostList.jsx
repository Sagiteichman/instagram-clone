import React from 'react'
import Suggestions from './Suggestions.jsx'
import PostPreview from './PostPreview.jsx'

export function PostList({ posts, fetchPosts, user, setEditedPostId }) {
  if (!posts.length) return <div>Loading Posts...</div>

  return (
    <div className='timeline'>
      <div className='timeline__left'>
        <div className='timeline__post'>
          {posts.map((post) => (
            <PostPreview
              key={post.id}
              id={post.id}
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
              text={post.text}
              fetchPosts={fetchPosts}
              setEditedPostId={setEditedPostId}
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
