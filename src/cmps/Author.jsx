import React from 'react'
import { Avatar } from '@mui/material'
import { timeSince } from '../services/timeSince'
import PropTypes from 'prop-types'

export const Author = ({ imageUrl, name = 'Guest', timestamp, onClick }) => {
  return (
    <div
      className='post__headerAuthor'
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Avatar src={imageUrl} alt={name} />
      {name}
      <span>{timestamp ? '• ' + timeSince(timestamp) : ''}</span>
    </div>
  )
}

Author.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  timestamp: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}
