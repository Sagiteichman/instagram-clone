import { useState } from 'react'
import { postService } from '../services/posts.service'

export const AddComment = ({
  commenterId,
  postId,
  comments,
  fetchPosts,
  showPostButton = false,
  addComment, // Add this prop
}) => {
  const [comment, setComment] = useState('')

  const onSubmitComment = async (event) => {
    event.preventDefault()
    if (comment.trim()) {
      await addComment(comment) // Use the provided addComment function
      setComment('')
      await fetchPosts()
    }
  }

  return (
    <form onSubmit={onSubmitComment} className='add_comment'>
      <input
        type='text'
        placeholder='Add a comment...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {showPostButton && <button>Post</button>}
    </form>
  )
}
