import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { HomepageIndex } from './pages/HomepageIndex.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import './assets/main.scss'
import Sidenav from './cmps/Sidenav.jsx'
import { userService } from './services/users.service.js'
import { postService } from './services/posts.service.js'
import { PostCompose } from './cmps/PostCompose.jsx'
import { CreatePost } from './cmps/CreatePost.jsx'
import { PostDetails } from './cmps/PostDetails.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [editedPostId, setEditedPostId] = useState(null)
  const [posts, setPosts] = useState([])
  const [isComposeModalOpen, setComposeModalOpen] = useState(false)
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [params] = useSearchParams()

  const selectedPostId = params.get('postId')

  const fetchPosts = async () => {
    const posts = await postService.getPosts()
    if (!posts) return
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

  const toggleComposeModal = () => {
    setComposeModalOpen(!isComposeModalOpen)
  }

  const toggleCreateModal = () => {
    setCreateModalOpen(!isCreateModalOpen)
  }

  const editedPost = posts.find((post) => post.id === editedPostId)
  const selectedPost = posts.find((post) => post.id === selectedPostId)

  return (
    <>
      <Sidenav
        toggleModal={toggleComposeModal}
        toggleCreateModal={toggleCreateModal}
        user={user}
      />
      <Routes>
        <Route
          path='/'
          element={
            <HomepageIndex
              user={user}
              posts={posts}
              fetchPosts={fetchPosts}
              setEditedPostId={setEditedPostId}
              currentUser={user}
            />
          }
        />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      {editedPost && (
        <PostCompose
          user={user}
          shouldShowComposeModal={true}
          toggleModal={() => setEditedPostId(null)}
          fetchPosts={fetchPosts}
          post={editedPost}
        />
      )}
      {isCreateModalOpen && (
        <CreatePost
          user={user}
          shouldShowCreateModal={isCreateModalOpen}
          toggleCreateModal={toggleCreateModal}
        />
      )}
      <PostDetails
        selectedPost={selectedPost}
        currentUser={user}
        fetchPosts={fetchPosts}
      />
    </>
  )
}

export default App
