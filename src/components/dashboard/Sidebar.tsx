import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setProfile, setToken } from '../../redux/slices/user'
import ConfirmationModal from '../common/ConfirmationModal'
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'


const Sidebar: React.FC<{ showNavbar: boolean }> = ({ showNavbar }) => {


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
        <div className={`bg-black border flex flex-col justify-between w-full h-full sm:w-[calc(30%-6px)] md:w-[calc(30%-10px)] rounded-xl p-5 ${!showNavbar ? 'hidden' : 'sm:relative absolute flex'} sm:block`}>

            <div className='hidden sm:flex gap-3 items-center'>
                <div className='border-2 rounded-full'>
                    <img src={profile?.image} className='w-[25px] h-[25px] object-cover rounded-full' />
                </div>
                <p>{profile?.firstName} {profile?.lastName}</p>
            </div>
            <div className='border'>
                <ul className='space-y-4'>
                    <li>Profile</li>
                    <li>Chats</li>
                    <li>Chats</li>
                    <li>Status</li>
                    <li>Settings</li>
                </ul>
            </div>
            <div className=''>
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
