import React from 'react'

export function PostCompose({ modal, toggleModal }) {
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
            <button className='modal__upload__button'>
              select from computer
            </button>
          </div>
        </div>
      )}
    </>
  )
}
