
import NavBar from '@/components/NavBar'
import WelcomePage from '@/framer/WelcomePage'
import React from 'react'

const Home = () => {
  return (
    <div>
      <NavBar headingVal='Welcome' />
      <WelcomePage />
    </div>
  )
}

export default Home
