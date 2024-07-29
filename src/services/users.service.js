// posts.service.js
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

export const userService = {
  getUserById,
  getUsers,
}
