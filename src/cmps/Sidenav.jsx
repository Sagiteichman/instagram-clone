import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar } from '@mui/material'

// Icons
import HomeIcon from '../assets/svg/HomeFocus.jsx'
import SearchIcon from '../assets/svg/Search.jsx'
import ExploreIcon from '../assets/svg/Explore.jsx'
import ReelsIcon from '../assets/svg/Reels.jsx'
import ChatIcon from '../assets/svg/Messenger.jsx'
import LikeIcon from '../assets/svg/Like.jsx'
import CreateIcon from '../assets/svg/Create.jsx'
import MoreIcon from '../assets/svg/Hamburger.jsx'

function Sidenav({ user, toggleCreateModal }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div className='sidenav'>
      <h2 className='sidenav__logo'>Bellingram</h2>
      <div className='sidenav__buttons'>
        <button
          className={'sidenav__button' + (pathname === '/' ? ' selected' : '')}
          onClick={() => handleNavigate('/')}
        >
          <HomeIcon fill='white' />
          <span className='sidenav__text'>Home</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/search' ? ' selected' : '')
          }
        >
          <SearchIcon />
          <span className='sidenav__text'>Search</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/explore' ? ' selected' : '')
          }
        >
          <ExploreIcon />
          <span className='sidenav__text'>Explore</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/reels' ? ' selected' : '')
          }
        >
          <ReelsIcon />
          <span className='sidenav__text'>Reels</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/messages' ? ' selected' : '')
          }
        >
          <ChatIcon />
          <span className='sidenav__text'>Messages</span>
        </button>
        <button
          className={
            'sidenav__button' +
            (pathname === '/notifications' ? ' selected' : '')
          }
        >
          <LikeIcon />
          <span className='sidenav__text'>Notifications</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/create' ? ' selected' : '')
          }
          onClick={toggleCreateModal}
        >
          <CreateIcon />
          <span className='sidenav__text'>Create</span>
        </button>
        <button
          className={
            'sidenav__button avatar__button' +
            (pathname === '/profile' ? ' selected' : '')
          }
          onClick={() => handleNavigate('/profile')}
        >
          {user && (
            <Avatar
              className='sidenav__avatar'
              src={user.imageUrl}
              alt={user.name || 'Guest'}
            >
              {/* {!postImage && user.charAt(0).toUpperCase()} */}
            </Avatar>
          )}
          <span className='sidenav__text'>Profile</span>
        </button>
      </div>
      <div className='sidenav_spacer'></div>
      <div className='sidenav__more'>
        <button
          className={
            'sidenav__button' + (pathname === '/more' ? ' selected' : '')
          }
        >
          <MoreIcon />
          <span className='sidenav__text'>More</span>
        </button>
      </div>
    </div>
  )
}

export default Sidenav
