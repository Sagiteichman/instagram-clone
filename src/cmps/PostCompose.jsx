import React, { useState } from 'react'

export function PostCompose({ modal, toggleModal }) {
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

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal__content'>
            <h2>Create new post</h2>
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
            {selectedImage && (
              <div className='modal__image__preview'>
                <img src={selectedImage} alt='Selected' />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
