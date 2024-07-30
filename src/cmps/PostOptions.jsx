import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

export function PostMenu({ isOpen, setIsOpen, onDeleteClick, onEditClick }) {
  const handleClose = () => setIsOpen(false)

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className='post__options'>
        <div className='post__buttons'>
          <button className='post__options__button' onClick={onDeleteClick}>
            delete
          </button>
          <button className='post__options__button' onClick={onEditClick}>
            Edit
          </button>
        </div>
      </div>
    </Modal>
  )
}
