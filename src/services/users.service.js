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
