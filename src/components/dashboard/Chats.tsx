import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
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

    return (
        <div className='bg-[white] text-black text-sm md:space-y-5 space-y-3 sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] md:p-5 p-3 w-full h-full rounded-xl'>
            <div className='bg-wrapper h-[36px] text-blue p-2 text-xs flex items-center justify-between rounded-md'>
                <button className={`${openSearch && 'w-full'} rounded-sm flex items-center justify-around`}>
                    <input type='text' placeholder='Search' value={searchStr} onChange={changeHandler} onKeyUp={enterHandler}
                        className={`${openSearch ? 'block' : 'hidden'} w-[calc(100%-50px)] h-[30px] bg-wrapper outline-none text-lowBlack`} />
                    <div className='p-1' onClick={clickHandler}>
                        {
                            openSearch ? <RxCross2 size={17} /> : <IoSearchOutline size={18} />
                        }
                    </div>
                </button>
                <div onClick={() => setTab('all')}
                    className={`${openSearch && 'hidden'} cursor-pointer rounded-sm ${tab === 'all' && 'bg-[white]'} md:px-5 px-2 py-1`} >
                    All
                </div>
                <div onClick={() => setTab('group')}
                    className={`${openSearch && 'hidden'} cursor-pointer rounded-sm ${tab === 'group' && 'bg-[white]'} md:px-5 px-2 py-1`} >
                    Groups
                </div>
                <div onClick={() => setTab('favorite')}
                    className={`${openSearch && 'hidden'} cursor-pointer rounded-sm ${tab === 'favorite' && 'bg-[white]'} md:px-5 px-2 py-1`}>
                    Favorites
                </div>
            </div>
            <div className='w-full md:h-[calc(100%-56px)] h-[calc(100%-48px)] p-2'>
                Chats
            </div>
        </div>
    )
}

export default Chats
