import React, { useState } from 'react'
import Header from '../components/dashboard/Header'
import Sidebar from '../components/dashboard/Sidebar'
import Chats from '../components/dashboard/Chats'

const Dashboard: React.FC = () => {

  const [showNavbar, setShowNavbar] = useState<boolean>(false)

  return (
    <div className='md:w-[799px] w-full h-[100vh] lg:h-[calc(100vh-40px)] xl:h-[calc(100vh-80px)] mx-auto lg:rounded-3xl rounded-none text-[white] bg-wrapper md:px-5 px-3 md:py-5 py-3 tracking-widest text-md md:space-y-5 space-y-3 shadow-lg'>
      <Header showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>
      <div className='relative flex w-full md:h-[calc(100%-70px)] h-[calc(100%-52px)] md:gap-5 gap-3'>
        <Sidebar showNavbar={showNavbar}/>
        <Chats/>
      </div>
    </div>
  )
}

export default Dashboard
