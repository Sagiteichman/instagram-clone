import React, { useEffect, useState } from 'react'
import { postService } from '../services/posts.service'
import Avatar from '@mui/material/Avatar'

export function PostCompose({
  shouldShowComposeModal,
  fetchPosts,
  toggleModal,
  user,
  post,
}) {
  const [postText, setPostText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

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
    if (post) {
      await postService.editPost(post.id, {
        text: postText,
        postImage: selectedImage,
      })
    } else {
      await postService.addPost({
        postImage: selectedImage,
        text: postText,
        userId: user.id,
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
          <h2>{post ? 'Edit Post' : 'Create Post'}</h2>
          <button
            className='modal__header__button done__button'
            onClick={handleSaveClick}
          >
            {post ? 'Save' : 'Create'}
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
