import React from 'react'
import { HiBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from '../../redux/hooks';
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

interface DashboardHeaderProps {
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>
    showNavbar: boolean
    notification: boolean
}

const Header: React.FC<DashboardHeaderProps> = ({ setShowNavbar, showNavbar, notification }) => {

    const { profile } = useAppSelector(state => state.user)

    return (
        <div className='w-full md:h-[50px] h-[40px] py-2 px-3 flex justify-between items-center rounded-xl bg-black'>
            <div>
                <span
                    onClick={() => setShowNavbar((prev) => !prev)}
                    className='sm:hidden block'>
                    {
                        showNavbar ? <RxCross2 size={23} /> : <HiBars3CenterLeft size={25} />
                    }
                </span>
                <div className='hidden sm:flex gap-3 items-center'>
                    <div className='border-2 rounded-full'>
                        <img src={profile?.image} className='w-[25px] h-[25px] object-cover rounded-full' />
                    </div>
                    <p>{profile?.firstName} {profile?.lastName}</p>
                </div>
            </div>
            <div className='flex items-center md:gap-4 gap-3'>
                <button
                    className='bg-[#2F80ED] rounded-md px-2 py-1 flex items-center justify-between gap-2'>
                    <p><FaPlus size={15} /></p>
                    <p className='md:block hidden tracking-wider'>New Chat</p>
                </button>
                <div className='relative cursor-pointer'>
                    <IoMdNotificationsOutline size={23} color='#2F80ED' />
                    <div className={`absolute w-[5px] h-[5px] rounded-full bg-[red] top-1 right-1 ${notification ? 'block' : 'hidden'}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Header
