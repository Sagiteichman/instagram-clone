import React from 'react'
import { useNavigate } from 'react-router-dom'

// Icons
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import ExploreIcon from '@mui/icons-material/Explore'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import ChatIcon from '@mui/icons-material/Chat'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar } from '@mui/material'

import { postService } from '../services/posts.service'

export function Sidenav({ toggleModal }) {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div className='sidenav'>
      <img
        className='sidenav__logo'
        src='https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distraction.png'
        alt='insagram logo'
      />
      <div className='sidenav__buttons'>
        <button className='sidenav__button' onClick={() => handleNavigate('/')}>
          <HomeIcon />
          <span>Home</span>
        </button>

        <button className='sidenav__button'>
          <SearchIcon />
          <span>Search</span>
        </button>

        <button className='sidenav__button'>
          <ExploreIcon />
          <span>Explore</span>
        </button>

        <button className='sidenav__button'>
          <SlideshowIcon />
          <span>Reels</span>
        </button>

        <button className='sidenav__button'>
          <ChatIcon />
          <span>Messages</span>
        </button>

        <button className='sidenav__button'>
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </button>

        <button className='sidenav__button' onClick={toggleModal}>
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>

        <button
          className='sidenav__button'
          onClick={() => handleNavigate('/profile')}
        >
          <Avatar
          // src={user?.imageUrl || postImage} alt={user?.name || 'Guest'}
          >
            {/* {!postImage && user.charAt(0).toUpperCase()} */}
          </Avatar>
          <span>Profile</span>
        </button>
      </div>

      <div className='sidenav__more'>
        <button className='sidenav__button'>
          <MenuIcon />
          <span>More</span>
        </button>
      </div>
    </div>
  )
}
