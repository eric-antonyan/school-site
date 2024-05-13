import React from 'react'
import UserRegister from './UserRegister'
import { isAuthentcated } from '../models/config.model'
import { useNavigate } from 'react-router-dom'

const UserRegisterForm = () => {
  const navigate = useNavigate()
  if (isAuthentcated) {
    navigate('/play')
  }
  
  return (
    <div>
      <UserRegister />
    </div>
  )
}

export default UserRegisterForm
