import React, { ChangeEvent, useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'
import { ChangePasswordState } from '../../lib/types/Settings'
import ConfirmationModal from '../common/ConfirmationModal'
import { ChangeToken, Logout, endpoints } from '../../lib/utils/Endpoint'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setProfile, setToken } from '../../redux/slices/user'
import { deleteRequest, putRequest } from '../../lib/utils/HttpsClient'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CommonResponseType } from '../../lib/types'
import { ChangeTokenResponse } from '../../lib/types/auth'

const Settings: React.FC = () => {


  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useAppSelector(state => state.user)
  const [disable, setDisable] = useState<boolean>(false)
  const [password, setPassword] = useState<ChangePasswordState>({
    oldPassword: '', newPassword: ''
  })
  const [openModal, setOpenModal] = useState<boolean>(false)


  function logout() {
    toast.error('Account has another login activity')
    //clear browser
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    //clear the store
    dispatch(setToken(null))
    dispatch(setProfile(null))

    navigate('/')
  }

  async function updatePassword() {
    try {

      if (password.newPassword === '' || password.oldPassword === '') {
        toast.error('Please fill all fields')
        return
      } else {
        setDisable(true)
        const output: CommonResponseType<ChangeTokenResponse> = await putRequest(endpoints.password, password, { headers: { authorization: token } })
        const response = output.data
        if (response.status) {
          toast.success(response.message)
        } else {
          if (output.status === Logout) {
            logout()
            return
          }
          toast.error(response.message)
        }
        setPassword({ oldPassword: '', newPassword: '' })
        setDisable(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  async function deleteAccount() {
    try {
      const output: CommonResponseType<ChangeTokenResponse> = await deleteRequest(endpoints.deleteAccount, { headers: { authorization: token } })
      const response = output.data
      if (response.status) {
        toast.success(response.message)
      } else {
        if (output.status === Logout) {
          toast.error('Account has another login activity')
          logout()
          return
        }
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setPassword((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  return (
    <div className='bg-[white] flex flex-col md:gap-8 gap-10 relative text-lowBlack text-sm sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] md:p-5 p-3 w-full h-full rounded-xl'>
      <div className='flex flex-col gap-8'>
        <h2 className='text-black text-lg'>Change Password</h2>
        <div className='lg:flex items-center lg:gap-2 lg:space-y-0 space-y-5'>
          <div className='relative w-full'>
            <input type='text' readOnly={disable} name='oldPassword' required={true}
              onChange={changeHandler} value={password.oldPassword}
              className='px-2 py-1 text-xs tracking-widest outline-none text-lowBlack border rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
            <p className='text-[10px] text-[black] bg-[white] absolute md:bottom-[24px] bottom-[19px] px-1 left-2'>Old Password</p>
          </div>
          <div className='relative w-full'>
            <input type='text' readOnly={disable} name='newPassword' required={true}
              onChange={changeHandler} value={password.newPassword}
              className='px-2 py-1 text-xs tracking-widest outline-none text-lowBlack border rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
            <p className='text-[10px] text-[black] bg-[white] absolute md:bottom-[24px] bottom-[19px] px-1 left-2'>New Password</p>
          </div>
        </div>
        <button onClick={updatePassword} disabled={disable}
          className='cursor-pointer bg-blue text-[white] mx-auto rounded-md sm:px-2 px-1 py-1 sm:py-[6px] flex items-center justify-between gap-2'>
          {
            disable && <ImSpinner9 size={18} className='animate-spin' />
          }
          {
            disable ? 'Updating..' : 'Update'
          }
        </button>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-black text-lg'>Delete Account</h2>
        <div className='bg-wrapper md:h-[85px] h-[150px] rounded-md md:flex items-center justify-between'>
          <p className='md:w-[70%] w-full pt-2 pl-2 pr-2 md:pr-0 md:h-full h-[70%]'>Deleting your account is permanent and will remove all the contain associated with it.</p>
          <div className='bg-[crimson] rounded-md md:w-[30%] w-full md:h-full h-[30%] text-blue flex items-center justify-center'>
            <button onClick={() => setOpenModal(true)}
              className='w-full h-full text-[white]'>
              Delete
            </button>
          </div>

        </div>
      </div>
      {/* modal */}
      {
        openModal && (<ConfirmationModal desc='Are You Want to Delete' btnText='Delete' triggerFunction={deleteAccount} setOpenModal={setOpenModal} />)
      }
    </div>
  )
}

export default Settings

