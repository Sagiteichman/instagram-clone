import React, { useState } from 'react'
import UploadPlaceHolder from '../assets/svg/UploadPlaceholder.jsx'

export function CreatePost({
  shouldShowCreateModal,
  toggleCreateModal,
  user,
  openPostCompose,
}) {
  const [selectedImage, setSelectedImage] = useState(null)

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

  if (!shouldShowCreateModal) {
    document.body.classList.remove('active-modal')
    return null
  } else {
    document.body.classList.add('active-modal')
  }

  const handleNextClick = () => {
    openPostCompose(selectedImage)
    toggleCreateModal()
  }

  const handleCancelClick = () => {
    setSelectedImage(null)
  }

  return (
    <div className='create-modal'>
      <div onClick={toggleCreateModal} className='create-overlay'></div>
      <div className='create-modal__content'>
        <div className='create-modal__header'>
          {selectedImage && (
            <button
              className='create-modal__header__button'
              onClick={handleCancelClick}
            >
              Back
            </button>
          )}
          <h2>Create new post</h2>
          {selectedImage && (
            <button
              className='create-modal__header__button done__button'
              onClick={handleNextClick}
            >
              Next
            </button>
          )}
        </div>
        <div className='create-modal__body'>
          {!selectedImage ? (
            <div className='create-modal__upload'>
              <UploadPlaceHolder />
              <p>Drag Photos and Videos here</p>
              <button className='create-upload__button'>
                Select from computer
                <input type='file' onChange={handleImageChange} />
              </button>
            </div>
          ) : (
            <div className='create-modal__image'>
              <img src={selectedImage} alt='Selected' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
