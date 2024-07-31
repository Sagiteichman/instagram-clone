import { Router } from 'express'
import { exampleUsers } from '../example-data/users.js'
import { examplePosts } from '../example-data/posts.js'
// import fs from 'fs'
const postsRouter = Router()

// get all posts
// GET /posts
postsRouter.get('/', (req, res) => {
  res.json(
    examplePosts.map((post) => ({
      ...post,
      user: exampleUsers.find((u) => u.name === post.user),
    }))
  )
})

// delete post
// DELETE /posts/:postId
postsRouter.delete('/:postId', (req, res) => {
  const postId = req.params.postId
  const postIndex = examplePosts.findIndex((post) => post.id === postId)
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' })
  }
  const deletedPost = examplePosts.splice(postIndex, 1)
  res.json({ success: true, deletedPost })
})

// add post
// POST /posts
postsRouter.post('/', (req, res) => {
  const newPost = req.body
  // fs.writeFile('./example-data/posts.json', newPost)
  examplePosts.unshift({
    ...newPost,
    id: Math.random().toString(),
    likes: 0,
    timestamp: Date.now(),
  })
  res.json(newPost)
})

// edit post
// PUT /posts/:postId
postsRouter.put('/:postId', (req, res) => {
  const postId = req.params.postId
  const postIndex = examplePosts.findIndex((post) => post.id === postId)
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' })
  }
  const postUpdates = req.body
  examplePosts[postIndex] = { ...examplePosts[postIndex], ...postUpdates }
  res.json(examplePosts[postIndex])
})

export { postsRouter }
