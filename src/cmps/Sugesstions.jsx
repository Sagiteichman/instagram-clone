import React from 'react'
import '../assets/cmps/Sugesstions.scss'
import { Avatar } from '@mui/material'

export function Sugesstions() {
  return (
    <div className='sugessions'>
      <div className='sugesstions__title'>Sugesstions for you</div>
      <div className='sugesstions__usernames'>
        <div className='sugesstions__username'>
          <div className='username__left'>
            <span className='avatar'>
              <Avatar>J</Avatar>
            </span>
            <div className='username__info'>
              <span className='username'>Jude</span>
              <span className='relation'>New to Instagram</span>
            </div>
          </div>
          <button className='follow__button'>Follow</button>
        </div>

        <div className='sugesstions__username'>
          <div className='username__left'>
            <span className='avatar'>
              <Avatar>J</Avatar>
            </span>
            <div className='username__info'>
              <span className='username'>Jude</span>
              <span className='relation'>New to Instagram</span>
            </div>
          </div>
          <button className='follow__button'>Follow</button>
        </div>

        <div className='sugesstions__username'>
          <div className='username__left'>
            <span className='avatar'>
              <Avatar>J</Avatar>
            </span>
            <div className='username__info'>
              <span className='username'>Jude</span>
              <span className='relation'>New to Instagram</span>
            </div>
          </div>
          <button className='follow__button'>Follow</button>
        </div>

        <div className='sugesstions__username'>
          <div className='username__left'>
            <span className='avatar'>
              <Avatar>J</Avatar>
            </span>
            <div className='username__info'>
              <span className='username'>Jude</span>
              <span className='relation'>New to Instagram</span>
            </div>
          </div>
          <button className='follow__button'>Follow</button>
        </div>
      </div>
    </div>
  )
}

export default Sugesstions
