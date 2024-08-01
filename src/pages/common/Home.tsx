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
    <div className='backdrop-blur-sm w-full mx-auto xs:rounded-3xl rounded-none text-[white] bg-wrapper xs:h-max h-[100vh] xs:w-[400px] px-5 py-10 tracking-widest text-md space-y-20 shadow-lg'>
      <h1 className='text-center font-medium text-blue text-3xl mb-10 cursor-pointer'>ℝ𝕙𝕪𝕥𝕙𝕞𝕔𝕙𝕒𝕥</h1>
      <div className='space-y-4'>
        <h2 className='text-3xl font-bold'>
          Let's Connect with Your Customer in Real Time.
        </h2>
        <p className='text-sm'>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
        </p>
      </div>
      <div>
        <Link to='/login'
        className='bg-black w-full rounded-2xl flex gap-4 justify-center items-center p-3'>
          Start Chatting Now
        </Link>
      </div>
    </div>
  )
}

export default Home
