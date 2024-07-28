import React, { useEffect, useState } from 'react'
import { Sidenav } from '../cmps/Sidenav'
import { PostList } from '../cmps/PostList'
import { PostCompose } from '../cmps/PostCompose.jsx'
import { postService } from '../services/posts.service.js'
import { userService } from '../services/users.service.js'

export function HomepageIndex() {
  const [isComposeModalOpen, setComposeModalOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [editedPostId, setEditedPostId] = useState(null)

  const currentUserPosts = posts.filter((post) => post.user.id === user.id)

  const fetchPosts = async () => {
    const posts = await postService.getPosts()
    setPosts(posts)
  }

  const fetchUser = async () => {
    const user = await userService.getUserById('1')
    setUser(user)
  }

  useEffect(() => {
    fetchPosts()
    fetchUser()
  }, [])

  const editedPost = posts.find((post) => post.id === editedPostId)
  const shouldShowComposeModal = editedPost || isComposeModalOpen

  const toggleModal = () => {
    setComposeModalOpen(!shouldShowComposeModal)
    setEditedPostId(null)
  }

  return (
    <div className='homepage'>
      <div className='homepage__nav'>
        <Sidenav toggleModal={toggleModal} />
      </div>
      <div className='homepage__timeline'>
        <PostList
          posts={posts}
          fetchPosts={fetchPosts}
          user={user}
          setEditedPostId={setEditedPostId}
        />
      </div>
      <PostCompose
        user={user}
        modal={shouldShowComposeModal}
        toggleModal={toggleModal}
        fetchPosts={fetchPosts}
        post={editedPost}
      />
    </div>
  )
}
