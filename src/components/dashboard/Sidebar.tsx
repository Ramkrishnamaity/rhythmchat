import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setProfile, setToken } from '../../redux/slices/user'
import ConfirmationModal from '../common/ConfirmationModal'

const Sidebar: React.FC<{ showNavbar: boolean }> = ({ showNavbar }) => {


    const { profile } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [openModal, setOpenModal] = useState<boolean>(false)

    function logout() {
        //clear browser
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
        //clear the store
        dispatch(setToken(null))
        dispatch(setProfile(null))
        window.location.reload()
    }

    return (
        <div
            className={`bg-black w-full h-full sm:w-[calc(30%-6px)] md:w-[calc(30%-10px)] rounded-xl p-5 ${!showNavbar ? 'hidden' : 'sm:relative absolute block'} sm:block`}>
            left
            <img src={profile?.image} width={50} height={50} className='object-cover rounded-full' />
            <button
                onClick={()=>setOpenModal(true)}
                className='text-[white]'>
                Log out
            </button>
            {/* modal */}
            {
                openModal && (<ConfirmationModal desc='Are You Want to Logout' btnText='Log Out' triggerFunction={logout} setOpenModal={setOpenModal} />)
            }
        </div>

    )
}

export default Sidebar
