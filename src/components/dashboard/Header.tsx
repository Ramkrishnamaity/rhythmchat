import React from 'react'
import { HiBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from '../../redux/hooks';


interface DashboardHeaderProps {
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>
    showNavbar: boolean
}

const Header: React.FC<DashboardHeaderProps> = ({ setShowNavbar, showNavbar }) => {

    const {profile} = useAppSelector(state => state.user)

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
                <p className='hidden sm:block'>{profile?.firstName}</p>
            </div>
            <div>
                top
            </div>
        </div>
    )
}

export default Header
