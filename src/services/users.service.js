// userService.js
import { API_BASE_URL } from '../constants.js'

async function getUserById(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`)
  const user = await response.json()
  return user
}

async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`)
  const users = await response.json()
  return users
}

// New function to save a post for a user
async function savePost(userId, postId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/save`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  })
  const updatedUser = await response.json()
  return updatedUser
}

// New function to unsave a post for a user
async function unsavePost(userId, postId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/unsave`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  })
  const updatedUser = await response.json()
  return updatedUser
}

export const userService = {
  getUserById,
  getUsers,
  savePost,
  unsavePost,
}
