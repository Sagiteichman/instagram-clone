import React, { useEffect, useState } from 'react'
import { postService } from '../services/posts.service'

export function PostCompose({
  shouldShowComposeModal,
  fetchPosts,
  toggleModal,
  user,
  post,
}) {
  const [step, setStep] = useState(0)
  const [postText, setPostText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const isEdit = !!post

  useEffect(() => {
    if (post) {
      setPostText(post.text)
      setSelectedImage(post.postImage)
      setStep(1)
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

  const handleStepClick = async () => {
    if (step === 0) {
      setStep((currentStep) => currentStep + 1)
      return
    }

    if (isEdit) {
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
        <div className='modal__content_upload'>
          <h2>{isEdit ? 'Edit post' : 'Create new post'}</h2>
          <button className='modal__close__button' onClick={toggleModal}>
            X
          </button>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id='upload-image'
          />
          <label className='modal__upload__button' htmlFor='upload-image'>
            Select from computer
          </label>
          <label className='modal__upload__button' onClick={handleStepClick}>
            {step === 1 ? 'Share' : 'Next'}
          </label>
          {selectedImage && (
            <div className='modal__image__preview'>
              <img src={selectedImage} alt='Selected' />
            </div>
          )}
        </div>
        {step === 1 && (
          <div>
            <input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
