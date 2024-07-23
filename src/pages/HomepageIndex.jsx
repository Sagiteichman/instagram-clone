import React from 'react'

import { Sidenav } from '../cmps/Sidenav'
import { PostList } from '../cmps/PostList'

export function HomepageIndex() {
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
