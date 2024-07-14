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
    <div className='flex flex-col justify-around items-center text-center w-full sm:px-10 px-0 h-full sm:rounded-2xl rounded-none bg-highBlack text-[white]'>
      <div className='text-2xl font-bold tracking-wider'>Rhythm Chat</div>
      <div className='space-y-4'>
        <p className='p-2'>Inspiring tech solutions for a bright future ahead</p>
        <button
          className='bg-[white] sm:h-[40px] h-[35px] rounded-xl w-full text-highBlack'
          onClick={()=> navigate('/login')}
          >Get Started
        </button>
      </div>
    </div>
  )
}

export default Home
