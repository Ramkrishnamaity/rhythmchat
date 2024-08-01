import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setProfile, setToken } from '../../redux/slices/user'
import ConfirmationModal from '../common/ConfirmationModal'
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { PiChatTextLight } from "react-icons/pi";
import { PiPhoneCallDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5"
import { CgMediaPodcast } from "react-icons/cg";

interface SidebarPropsType {
    showNavbar: boolean
    right: string
    setRight: React.Dispatch<React.SetStateAction<string>>
}

const Sidebar: React.FC<SidebarPropsType> = ({ showNavbar, setRight, right }) => {


    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { profile } = useAppSelector(state => state.user)
    const [openModal, setOpenModal] = useState<boolean>(false)

    function logout() {
        //clear browser
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
        //clear the store
        dispatch(setToken(null))
        dispatch(setProfile(null))

        navigate('/')
    }

    return (
        <div className={`bg-black text-sm flex flex-col justify-center w-full h-full sm:w-[calc(30%-6px)] md:w-[calc(30%-10px)] rounded-xl p-5 ${!showNavbar ? 'hidden' : 'sm:relative absolute flex'} sm:block`}>

            <div className='absolute top-5 text-md font-semibold uppercase sm:hidden flex gap-3 items-center'>
                <div className='border-2 rounded-full'>
                    <img src={profile?.image} className='w-[30px] h-[30px] object-cover rounded-full' />
                </div>
                <p>{profile?.firstName} {profile?.lastName}</p>
            </div>
            <div className='ml-[-21px] tracking-widest sm:mt-5 md:mt-4'>
                <ul className='space-y-10'>
                    <li onClick={()=> setRight('Profile')}
                    className={`${right === 'Profile' && 'border-l-4'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                        <CgProfile size={20} />
                        <p>Profile</p>
                    </li>
                    <li onClick={()=> setRight('Chats')}
                    className={`${right === 'Chats' && 'border-l-4'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                        <PiChatTextLight size={22}/>
                        <p>Chats</p>
                    </li>
                    <li onClick={()=> setRight('Status')}
                    className={`${right === 'Status' && 'border-l-4'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                        <CgMediaPodcast size={20} />
                        <p>Status</p>
                    </li>
                    <li onClick={()=> setRight('Calls')}
                    className={`${right === 'Calls' && 'border-l-4'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                        <PiPhoneCallDuotone  size={22} />
                        <p>Calls</p>
                    </li>
                    <li onClick={()=> setRight('Settings')}
                    className={`${right === 'Settings' && 'border-l-4'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                        <IoSettingsOutline size={20} />
                        <p>Settings</p>
                    </li>
                </ul>
            </div>
            <div className='absolute bottom-5'>
                <button
                    onClick={() => setOpenModal(true)}
                    className='text-[white] flex items-center gap-4'>
                    <span><HiOutlineLogout className='rotate-180' size={15} /></span>
                    Log out
                </button>
            </div>

            {/* modal */}
            {
                openModal && (<ConfirmationModal desc='Are You Want to Logout' btnText='Log Out' triggerFunction={logout} setOpenModal={setOpenModal} />)
            }
        </div >

    )
}

export default Sidebar
