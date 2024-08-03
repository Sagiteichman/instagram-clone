import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { HomepageIndex } from './pages/HomepageIndex.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { Explore } from './cmps/Explore.jsx'
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
  const [selectedImageForCompose, setSelectedImageForCompose] = useState(null)
  const [mode, setMode] = useState('create') // new state variable for mode
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

  const updatePostLikes = (postId, likes) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, likes } : post))
    )
  }

  const updatePostComments = (postId, comments) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments } : post
      )
    )
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

  const openPostCompose = (image) => {
    setSelectedImageForCompose(image)
    setMode('create') // Set mode to create
    setComposeModalOpen(true)
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
              setEditedPostId={(id) => {
                setEditedPostId(id)
                setMode('edit') // Set mode to edit when editing a post
                setComposeModalOpen(true)
              }}
              currentUser={user}
              updatePostLikes={updatePostLikes} // Pass the function here
              updatePostComments={updatePostComments} // Pass the function here
            />
          }
        />
        <Route
          path='/profile/:userId'
          element={
            <ProfilePage
              updatePostLikes={updatePostLikes}
              updatePostComments={updatePostComments}
            />
          }
        />
        <Route
          path='/explore'
          element={
            <Explore
              posts={posts}
              currentUser={user}
              updatePostLikes={updatePostLikes}
            />
          }
        />
      </Routes>
      {editedPost && (
        <PostCompose
          user={user}
          shouldShowComposeModal={true}
          toggleModal={() => {
            setEditedPostId(null)
            toggleComposeModal()
          }}
          fetchPosts={fetchPosts}
          post={editedPost}
          mode={mode}
        />
      )}
      {isCreateModalOpen && (
        <CreatePost
          user={user}
          shouldShowCreateModal={isCreateModalOpen}
          toggleCreateModal={toggleCreateModal}
          openPostCompose={openPostCompose}
        />
      )}
      {isComposeModalOpen && !editedPost && (
        <PostCompose
          user={user}
          shouldShowComposeModal={true}
          toggleModal={toggleComposeModal}
          fetchPosts={fetchPosts}
          post={{ postImage: selectedImageForCompose, text: '' }}
          mode={mode}
        />
      )}
      {selectedPost && (
        <PostDetails
          selectedPost={selectedPost}
          currentUser={user}
          fetchPosts={fetchPosts}
          updatePostLikes={updatePostLikes} // Pass the function here
          updatePostComments={updatePostComments} // Pass the function here
        />
      )}
    </>
  )
}

export default App
