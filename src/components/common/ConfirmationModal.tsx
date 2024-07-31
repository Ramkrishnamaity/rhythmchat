import React from 'react'

interface ModalPropsType {
  desc: string,
  btnText: string,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  triggerFunction(): void
}

const ConfirmationModal: React.FC<ModalPropsType> = ({ desc, btnText, triggerFunction, setOpenModal }) => {



  return (
    <div className='text-[#FFFFFF99] z-10 fixed overflow-auto top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='border border-white flex flex-col items-center gap-1 p-8 rounded-lg bg-richBlack '>
        <h1>Are you sure?</h1>
        <p>{desc}</p>
        <div className='my-2'
          onClick={() => {
            triggerFunction()
            setOpenModal(false)
          }}>
          <button className='flex gap-2 items-center bg-[crimson] px-4 rounded-md py-2 text-white' >
            {btnText}
          </button>
        </div>
        <button onClick={()=>setOpenModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
