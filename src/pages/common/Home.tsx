import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { Link, useNavigate } from 'react-router-dom'

const Home: React.FC = () => {

  const navigate = useNavigate()
  const { token } = useAppSelector(state => state.user)

  if (token) {
    navigate('/dashboard')
  }


  return (
    <div className='flex justify-center items-center w-full h-full rounded-3xl bg-[white]'>

    </div>
  )
}

export default Home
