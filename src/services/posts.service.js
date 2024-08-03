// posts.service.js
import { API_BASE_URL } from '../constants.js'
import { storageService } from './storage.service.js'

const POST_KEY = 'postDB'

function _createPosts() {
  let posts = storageService.loadFromStorage(POST_KEY)
  if (!posts || !posts.length) {
    posts = [
      {
        id: '1',
        user: 'Jude',
        postImage:
          'https://e0.365dm.com/23/11/1600x900/skysports-jude-bellingham-real-madrid_6377097.jpg?20231129223659.',
        likes: [],
        timestamp: Date.now(),
      },
      // Add more demo posts if needed
    ]
    storageService.saveToStorage(POST_KEY, posts)
  }
}

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
  console.log(newPost, 'from front')
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

_createPosts()

export const postService = {
  getPosts,
  deletePost,
  addPost,
  editPost,
  updatePostLikes,
}
