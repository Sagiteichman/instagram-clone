import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'

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
    <div className='modal'>
      <div onClick={toggleCreateModal} className='overlay'></div>
      <div className='modal__content'>
        <div className='modal__header'>
          <button className='modal__header__button' onClick={toggleCreateModal}>
            Cancel
          </button>
          <h2>Create Post</h2>
          <button
            className='modal__header__button done__button'
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>
        <div className='modal__body'>
          <div className='modal__image'>
            {selectedImage && <img src={selectedImage} alt='Selected' />}
            <input type='file' onChange={handleImageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
