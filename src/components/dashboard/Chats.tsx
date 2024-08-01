import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Chats: React.FC = () => {

    const [openSearch, setOpenSearch] = useState<boolean>(false)
    const [searchStr, setSearchStr] = useState<string>('')
    const [tab, setTab] = useState<string>('all')


    function changeHandler(e: ChangeEvent<HTMLInputElement>) {

        setSearchStr(e.target.value)
    }

    function enterHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            console.log("Search String: ", searchStr)
            return
        }
    }

    function clickHandler() {
        setSearchStr('')
        setOpenSearch((prev) => !prev)
    }

    function selectHandler(e: ChangeEvent<HTMLInputElement>) {
        setTab(e.target.value)
    }

    return (
        <div className='bg-black text-sm md:space-y-5 space-y-3 sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] md:p-5 p-3 w-full h-full rounded-xl'>
            <div className='bg-lowBlack h-[36px] text-blue p-2 text-xs flex items-center justify-between rounded-md'>
                <button className={`${openSearch && 'w-full'} rounded-sm flex items-center justify-around`}>
                    <input type='text' value={searchStr} onChange={changeHandler} onKeyUp={enterHandler}
                        className={`${openSearch ? 'block' : 'hidden'} w-[calc(100%-50px)] h-[30px] bg-lowBlack outline-none text-[#fff]`} />
                    <div className='p-1' onClick={clickHandler}>
                        {
                            openSearch ? <RxCross2 size={17} /> : <IoSearchOutline size={18} />
                        }
                    </div>
                </button>
                <div className={`${openSearch && 'hidden'} rounded-sm ${tab === 'all' && 'bg-wrapper'} md:px-5 px-2 py-1`} >
                    <input type='radio' name='tab' id='all' value='all' onChange={selectHandler} className='hidden'/>
                    <label htmlFor='all'>All</label>
                </div>
                <div className={`${openSearch && 'hidden'} rounded-sm ${tab === 'group' && 'bg-wrapper'} md:px-5 px-2 py-1`} >
                    <input type='radio' name='tab' id='group' value='group' onChange={selectHandler} className='hidden'/>
                    <label htmlFor='group'>Groups</label>
                </div>
                <div className={`${openSearch && 'hidden'} rounded-sm ${tab === 'favorite' && 'bg-wrapper'} md:px-5 px-2 py-1`}>
                    <input type='radio' name='tab' id='favorite' value='favorite' onChange={selectHandler} className='hidden'/>
                    <label htmlFor='favorite'>Favorites</label>
                </div>
            </div>
            <div className='w-full md:h-[calc(100%-56px)] h-[calc(100%-48px)] p-2'>
                Chats
            </div>
        </div>
    )
}

export default Chats
