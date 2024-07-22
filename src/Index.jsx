import React from 'react'
import './index.css'
import { Sidenav } from './navigation/Sidenav'
import { PostList } from './timeline/PostList'

export function Index() {
  return (
    <div className='homepage'>
      <div className='homepage__nav'>
        <Sidenav />
      </div>
      <div className='homepage__timeline'>
        <PostList />
      </div>
    </div>
  )
}
