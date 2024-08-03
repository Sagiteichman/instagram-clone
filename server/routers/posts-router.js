import { Router } from 'express'
import { exampleUsers } from '../example-data/users.js'
import { examplePosts } from '../example-data/posts.js'

const postsRouter = Router()

// get all posts
// GET /posts
postsRouter.get('/', (req, res) => {
  const posts = examplePosts.map((post) => ({
    ...post,
    user: exampleUsers.find((u) => u.name === post.user),
    comments: post.comments?.map((comment) => ({
      ...comment,
      user: exampleUsers.find((u) => u.id === comment.userId),
    })),
  }))
  res.json(posts)
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
  const newPostWithId = {
    ...newPost,
    id: Math.random().toString(),
    likes: [],
    comments: [],
    timestamp: Date.now(),
  }
  examplePosts.unshift(newPostWithId)
  res.json(newPostWithId)
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

// like/unlike post
// PATCH /posts/:postId/like
postsRouter.patch('/:postId/like', (req, res) => {
  const postId = req.params.postId
  const { userId } = req.body

  const post = examplePosts.find((post) => post.id === postId)
  if (!post) {
    return res.status(404).json({ error: 'Post not found' })
  }

  const userIndex = post.likes.indexOf(userId)
  if (userIndex === -1) {
    post.likes.push(userId)
  } else {
    post.likes.splice(userIndex, 1)
  }

  res.json(post)
})

export { postsRouter }
