import React from 'react'
import './Timeline.css'
import Sugesstions from './Sugesstions.jsx'
import Post from './posts/Post.jsx'

export function Timeline() {
  return (
    <div className='timeline'>
      <div className='timeline__left'>
        <div className='timeline__post'>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div className='timeline__right'>
        <Sugesstions />
      </div>
    </div>
  )
}
