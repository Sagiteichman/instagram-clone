import { Router } from 'express'
import { exampleUsers } from '../example-data/users.js'

const usersRouter = Router()

// Get all users
usersRouter.get('/', (req, res) => {
  res.json(exampleUsers)
})

// Get user by id
usersRouter.get('/:userId', (req, res) => {
  const user = exampleUsers.find((u) => u.id === req.params.userId)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

// Save a post for a user
usersRouter.patch('/:userId/save', (req, res) => {
  const user = exampleUsers.find((u) => u.id === req.params.userId)
  if (user) {
    if (!user.saved.includes(req.body.postId)) {
      user.saved.push(req.body.postId)
    }
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

// Unsave a post for a user
usersRouter.patch('/:userId/unsave', (req, res) => {
  const user = exampleUsers.find((u) => u.id === req.params.userId)
  if (user) {
    user.saved = user.saved.filter((postId) => postId !== req.body.postId)
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

export { usersRouter }
