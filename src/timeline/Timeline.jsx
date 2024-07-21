import React from 'react'
import './Timeline.css'
import Sugesstions from './Sugesstions.jsx'

export function Timeline() {
  return (
    <div className='timeline'>
      timeline
      <div className='timeline__left'></div>
      <div className='timeline__right'>
        <Sugesstions />
      </div>
    </div>
  )
}
