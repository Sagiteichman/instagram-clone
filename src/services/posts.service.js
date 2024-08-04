// services/posts.service.js
import { API_BASE_URL } from '../constants.js'

async function getPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`)
  const posts = await response.json()
  return posts
}

async function deletePost(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  })
  const deletedPost = await response.json()
  return deletedPost
}

async function addPost(post) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
  const newPost = await response.json()
  return newPost
}

async function editPost(postId, postUpdates) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postUpdates),
  })
  const editedPost = await response.json()
  return editedPost
}

async function updatePostLikes(postId, userId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  })
  const updatedPost = await response.json()
  return updatedPost
}

export const postService = {
  getPosts,
  deletePost,
  addPost,
  editPost,
  updatePostLikes,
}
