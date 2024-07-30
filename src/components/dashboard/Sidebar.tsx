import React from 'react'
import bg from '../../assets/bg.jpg'

const Sidebar: React.FC<{ showNavbar: boolean }> = ({ showNavbar }) => {
    return (
        <div
            className={`bg-black w-full h-full sm:w-[calc(30%-6px)] md:w-[calc(30%-10px)] rounded-xl p-5 ${!showNavbar ? 'hidden' : 'sm:relative absolute block'} sm:block`}>
            left
            <img src={bg} width={50} height={50} className='object-cover rounded-full' />
        </div>
    )
}

export default Sidebar
