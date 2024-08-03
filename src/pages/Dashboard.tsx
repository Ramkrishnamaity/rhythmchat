import React, { useState } from 'react'
import Header from '../components/dashboard/Header'
import Sidebar from '../components/dashboard/Sidebar'
import Chats from '../components/dashboard/Chats'
import Profile from '../components/dashboard/Profile'
import Status from '../components/dashboard/Status'
import Calls from '../components/dashboard/Calls'
import Settings from '../components/dashboard/Settings'

const Dashboard: React.FC = () => {

  const [showNavbar, setShowNavbar] = useState<boolean>(false)
  const [right, setRight] = useState<string>('Chats')

  return (
    <div className='backdrop-blur-sm md:w-[799px] w-full h-[100vh] lg:h-[calc(100vh-40px)] xl:h-[calc(100vh-80px)] mx-auto lg:rounded-3xl rounded-none text-[white] bg-wrapper md:p-5 p-3 tracking-widest text-md md:space-y-5 space-y-3 shadow-lg'>
      <Header showNavbar={showNavbar} setRight={setRight} setShowNavbar={setShowNavbar} notification={true}/>
      <div className='relative z-0 flex w-full md:h-[calc(100%-70px)] h-[calc(100%-52px)] md:gap-5 gap-3'>
        <Sidebar showNavbar={showNavbar} setRight={setRight} right={right}/>
        {
          right === 'Profile' && <Profile/>
        }
        {
          right === 'Chats' && <Chats/>
        }
        {
          right === 'Status' && <Status/>
        }
        {
          right === 'Calls' && <Calls/>
        }
        {
          right === 'Settings' && <Settings/>
        }
      </div>
    </div>
  )
}

export default Dashboard
