import React, { useState } from 'react'
import { Sidenav } from '../cmps/Sidenav'
import { PostList } from '../cmps/PostList'
import { PostCompose } from '../cmps/PostCompose.jsx'

export function HomepageIndex() {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <div className='homepage'>
      <div className='homepage__nav'>
        <Sidenav toggleModal={toggleModal} />
      </div>
      <div className='homepage__timeline'>
        <PostList />
      </div>
      <PostCompose modal={modal} toggleModal={toggleModal} />
    </div>
  )
}
