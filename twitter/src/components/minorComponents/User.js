import React from 'react'

const User = ({ user }) => {

  return (
    
    <li className='user'>
      {user.name}
    </li>
  )
}

export default User