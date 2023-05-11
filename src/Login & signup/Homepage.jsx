import React from 'react'
import NavBar from '../NavBar'

function Homepage() {
  return (
    <div>
                 <NavBar />
      <div className='home-div'>
    
    <h3 className='welcome' >Welcome</h3>
  </div>
  <div className='Login-div'>
    <span>Login to see more...!</span>
  </div>
    </div>
  )
}

export default Homepage