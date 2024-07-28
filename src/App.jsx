import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomepageIndex } from './pages/HomepageIndex.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import './assets/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomepageIndex />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
