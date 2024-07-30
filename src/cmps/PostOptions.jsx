import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

export function PostMenu({ isOpen, setIsOpen, onDeleteClick, onEditClick }) {
  const handleClose = () => setIsOpen(false)

  return (
    <div className='modal'>
      <div onClick={handleClose} open={isOpen} className='overlay'></div>
      <div className='post__options'>
        <div className='post__buttons'>
          <button
            className='post__options__button options_delete_button'
            onClick={onDeleteClick}
          >
            <span>Delete</span>
          </button>
          <button className='post__options__button' onClick={onEditClick}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
