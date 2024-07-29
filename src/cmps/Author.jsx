import { Avatar } from '@mui/material'
import { timeSince } from '../services/timeSince'

export const Author = ({ imageUrl, name = 'Guest' }) => {
  return (
    <div className='post__headerAuthor'>
      <Avatar src={imageUrl} alt={name} />
      {name}
    </div>
  )
}
