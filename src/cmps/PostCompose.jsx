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
          <div className='modal-content'>
            <h2>Hello Modal</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className='close-modal' onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  )
}
