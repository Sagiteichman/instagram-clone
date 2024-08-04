import React, { useEffect, useState } from 'react'
import { postService } from '../services/posts.service'
import Avatar from '@mui/material/Avatar'

export function PostCompose({
  shouldShowComposeModal,
  fetchPosts,
  toggleModal,
  user,
  post,
  mode,
}) {
  const [postText, setPostText] = useState('')
  const [selectedImage, setSelectedImage] = useState(post?.postImage || null)

  useEffect(() => {
    if (post) {
      setPostText(post.text)
      setSelectedImage(post.postImage)
    }
  }, [post])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!shouldShowComposeModal) {
    document.body.classList.remove('active-modal')
    return null
  } else {
    document.body.classList.add('active-modal')
  }

  const handleSaveClick = async () => {
    if (mode === 'edit') {
      await postService.editPost(post.id, {
        text: postText,
        postImage: selectedImage,
      })
    } else {
      await postService.addPost({
        postImage: selectedImage,
        text: postText,
        userId: user.id, // Ensure the post is associated with the correct user ID
      })
    }
    await fetchPosts()
    toggleModal()
  }

  return (
    <div className='modal'>
      <div onClick={toggleModal} className='overlay'></div>
      <div className='modal__content'>
        <div className='modal__header'>
          <button className='modal__header__button' onClick={toggleModal}>
            Cancel
          </button>
          <h2>{mode === 'edit' ? 'Edit Info' : 'Create new post'}</h2>
          <button
            className='modal__header__button done__button'
            onClick={handleSaveClick}
          >
            {mode === 'edit' ? 'Done' : 'Upload'}
          </button>
        </div>
        <div className='modal__body'>
          <div className='modal__image'>
            {selectedImage && <img src={selectedImage} alt='Selected' />}
          </div>
          <div className='modal__info'>
            <div className='modal__info__header'>
              <Avatar
                className='modal__avatar'
                src={user.imageUrl}
                alt={user.name}
              />
              <div className='modal__user__info'>
                <h3>{user.name}</h3>
              </div>
            </div>
            <textarea
              className='user__info__textarea'
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder='Write a caption...'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
