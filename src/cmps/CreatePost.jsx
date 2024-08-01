import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import UploadPlaceHolder from '../assets/svg/UploadPlaceholder.jsx'

export function CreatePost({ shouldShowCreateModal, toggleCreateModal, user }) {
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

  const handleCreateClick = async () => {
    // Implement the logic for creating a new post here
    toggleCreateModal()
  }

  return (
    <div className='create-modal'>
      <div onClick={toggleCreateModal} className='create-overlay'></div>
      <div className='create-modal__content'>
        <div className='create-modal__header'>
          <button
            className='create-modal__header__button'
            onClick={toggleCreateModal}
          >
            Cancel
          </button>
          <h2>Create Post</h2>
          <button
            className='create-modal__header__button done__button'
            onClick={handleCreateClick}
          >
            Create
          </button>
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
