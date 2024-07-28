// posts.service.js
import { API_BASE_URL } from "../constants.js";

async function getUserById(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  const user = await response.json();
  return user;
}

export const userService = {
  getUserById,
};
