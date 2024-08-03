import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar } from '@mui/material'

// Icons
import HomeIcon from '../assets/svg/HomeFocus.jsx'
import HomeIconEmpty from '../assets/svg/Home.jsx'
import SearchIcon from '../assets/svg/Search.jsx'
import ExploreIcon from '../assets/svg/Explore.jsx'
import ExploreFocus from '../assets/svg/ExploreFocus.jsx'
import ReelsIcon from '../assets/svg/Reels.jsx'
import ReelsFocus from '../assets/svg/ReelsFocus.jsx'
import ChatIcon from '../assets/svg/Messenger.jsx'
import MessengerFocus from '../assets/svg/MessengerFocus.jsx'
import LikeIcon from '../assets/svg/Like.jsx'
import LikeFilled from '../assets/svg/LikeFilled.jsx'
import CreateIcon from '../assets/svg/Create.jsx'
import MoreIcon from '../assets/svg/Hamburger.jsx'

function Sidenav({ user, toggleCreateModal }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleNavigate = (path) => {
    navigate(path)
  }

  const navigateToUserProfile = () => {
    navigate(`/profile/1`) // Navigate to the profile page of the main user with userId = 1
  }

  return (
    <div className='sidenav'>
      <h2 className='sidenav__logo'>Bellingram</h2>
      <div className='sidenav__buttons'>
        <button
          className={'sidenav__button' + (pathname === '/' ? ' selected' : '')}
          onClick={() => handleNavigate('/')}
        >
          {pathname === '/' ? (
            <HomeIcon fill='white' />
          ) : (
            <HomeIconEmpty fill='white' />
          )}
          <span className='sidenav__text'>Home</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/search' ? ' selected' : '')
          }
          onClick={() => handleNavigate('/search')}
        >
          <SearchIcon />
          <span className='sidenav__text'>Search</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/explore' ? ' selected' : '')
          }
          onClick={() => handleNavigate('/explore')}
        >
          {pathname === '/explore' ? (
            <ExploreFocus fill='white' />
          ) : (
            <ExploreIcon fill='white' />
          )}
          <span className='sidenav__text'>Explore</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/reels' ? ' selected' : '')
          }
          onClick={() => handleNavigate('/reels')}
        >
          {pathname === '/reels' ? (
            <ReelsFocus fill='white' />
          ) : (
            <ReelsIcon fill='white' />
          )}
          <span className='sidenav__text'>Reels</span>
        </button>
        <button
          className={
            'sidenav__button' + (pathname === '/messages' ? ' selected' : '')
          }
          onClick={() => handleNavigate('/messages')}
        >
          {pathname === '/messages' ? (
            <MessengerFocus fill='white' />
          ) : (
            <ChatIcon fill='white' />
          )}
          <span className='sidenav__text'>Messages</span>
        </button>
        <button
          className={
            'sidenav__button' +
            (pathname === '/notifications' ? ' selected' : '')
          }
          onClick={() => handleNavigate('/notifications')}
        >
          {pathname === '/notifications' ? (
            <LikeFilled fill='white' />
          ) : (
            <LikeIcon fill='white' />
          )}
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
            (pathname === '/profile/1' ? ' selected' : '')
          }
          onClick={navigateToUserProfile}
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
          onClick={() => handleNavigate('/more')}
        >
          <MoreIcon />
          <span className='sidenav__text'>More</span>
        </button>
      </div>
    </div>
  )
}

export default Sidenav
