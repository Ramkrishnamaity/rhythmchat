import React, { ChangeEvent, useState } from 'react'
import { GoEyeClosed, GoEye } from 'react-icons/go'
import { ImSpinner9 } from 'react-icons/im'
import { ChangePasswordState } from '../../lib/types/Settings'
import ConfirmationModal from '../common/ConfirmationModal'
import { endpoints } from '../../lib/utils/Endpoint'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setProfile, setToken } from '../../redux/slices/user'
import { deleteRequest, putRequest } from '../../lib/utils/HttpsClient'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Settings: React.FC = () => {


  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useAppSelector(state => state.user)
  const [disable, setDisable] = useState<boolean>(false)
  const [password, setPassword] = useState<ChangePasswordState>({
    oldPassword: '', newPasswprd: ''
  })
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [showPassword1, setShowPassword1] = useState<boolean>(false)
  const [showPassword2, setShowPassword2] = useState<boolean>(false)

  async function updatePassword() {
    try {

      if (password.newPasswprd === '' || password.oldPassword === '') {
        toast.error('Please fill all fields')
      } else {
        if (password.newPasswprd !== password.oldPassword) {
          toast.error("Password does't match")
        } else {
          setDisable(true)
          const response = await putRequest(endpoints.password, password, { headers: { authorization: token } })
          if (response.status) {
            toast.success(response.message)
          } else {
            toast.error(response.message)
          }
          setPassword({ oldPassword: '', newPasswprd: '' })
          setDisable(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteAccount() {
    try {
      const response = await deleteRequest(endpoints.deleteAccount, { headers: { authorization: token } })
      if (response.status) {
        toast.success(response.message)
        //clear browser
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
        //clear the store
        dispatch(setToken(null))
        dispatch(setProfile(null))

        navigate('/')
      } else {
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
    <div className='bg-black text-sm md:space-y-8 space-y-10 sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] md:p-5 p-3 w-full h-full rounded-xl'>
      <div className='flex flex-col gap-5'>
        <h2 className='text-blue text-lg'>Change Password</h2>
        <div className='lg:flex items-center lg:gap-2 lg:space-y-0 space-y-3'>
          <div className='w-full space-y-2 relative'>
            <input type={showPassword1 ? 'text' : 'password'} onChange={changeHandler} value={password.newPasswprd}
              name='newPasswprd' readOnly={disable} placeholder='Enter Password'
              className='text-[white] bg-lowBlack w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider'
              required={true} />
            <span className='absolute right-3 bottom-2 text-[white]' onClick={() => setShowPassword1((prev) => !prev)}>
              {
                showPassword1 ? <GoEyeClosed size={20} /> : <GoEye size={20} />
              }
            </span>
          </div>
          <div className='w-full space-y-2 relative'>
            <input type={showPassword2 ? 'text' : 'password'} onChange={changeHandler} value={password.oldPassword}
              name='oldPassword' readOnly={disable} placeholder='Confirm Password'
              className='text-[white] bg-lowBlack w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider'
              required={true} />
            <span className='absolute right-3 bottom-2 text-[white]' onClick={() => setShowPassword2((prev) => !prev)}>
              {
                showPassword2 ? <GoEyeClosed size={20} /> : <GoEye size={20} />
              }
            </span>
          </div>
        </div>
        <button onClick={updatePassword} disabled={disable}
          className='cursor-pointer bg-blue mx-auto rounded-md sm:px-2 px-1 py-1 sm:py-[6px] flex items-center justify-between gap-2'>
          {
            disable && <ImSpinner9 size={18} className='animate-spin' />
          }
          {
            disable ? 'Updating..' : 'Update'
          }
        </button>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-blue text-lg'>Delete Account</h2>
        <div className='bg-lowBlack md:h-[85px] h-[150px] rounded-md md:flex items-center justify-between'>
          <p className='md:w-[70%] w-full pt-2 pl-2 pr-2 md:pr-0 md:h-full h-[70%]'>Deleting your account is permanent and will remove all the contain associated with it.</p>
          <div className='border rounded-md border-lowBlack md:w-[30%] w-full md:h-full h-[30%] bg-black text-blue flex items-center justify-center'>
            <button onClick={() => setOpenModal(true)}
              className='w-full h-full'>
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
