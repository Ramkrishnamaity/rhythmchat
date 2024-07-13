import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  
  const navigate = useNavigate()
  const {token} = useAppSelector(state => state.user)

  if(!token) {
    navigate('/dashboard')
  }


  return (
    <div>
      Home
    </div>
  )
}

export default Home
