import React, { ChangeEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ImSpinner9 } from 'react-icons/im'
import { GoPencil } from "react-icons/go";
import { ProfileFormData, ProfileResponceType } from '../../lib/types/Profile';
import { postRequest, putRequest } from '../../lib/utils/HttpsClient';
import { Logout, endpoints } from '../../lib/utils/Endpoint';
import { toast } from 'react-toastify';
import { setProfile, setToken } from '../../redux/slices/user';
import { FileUploadResponce } from '../../lib/types/Upload';
import { CommonResponseType } from '../../lib/types';
import DisplayModal from '../common/DisplayModal';
import { useNavigate } from 'react-router-dom';
import { ChangeTokenResponse } from '../../lib/types/auth';

const Profile: React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const imageRef = useRef<null | HTMLInputElement>(null)
  const [image, setImage] = useState<File | null>(null)
  const { profile, token } = useAppSelector(state => state.user)
  const [disable, setDisable] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: profile?.firstName ?? '', lastName: profile?.lastName ?? '', about: profile?.about ?? '', image: profile?.image ?? ''
  })


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

  function formatDate(date?: string) {
    if (!date) return ''
    const dt = new Date(date);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = dt.getDate()
    const month = months[dt.getMonth()]
    const year = dt.getFullYear()

    return `${day} ${month} ${year}`
  }

  function pickImageHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(e.target.files[0])
      setIsChange(true)
    }
  }

  function clickHandler() {
    if (imageRef.current) imageRef.current.click()
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setProfileData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    setIsChange(true)
  }

  async function imageUpload(data: any, image: File) {
    const formData = new FormData()
    formData.append('file', image)
    const output: CommonResponseType<FileUploadResponce | ChangeTokenResponse> = await postRequest(endpoints.fileUpload, formData, { headers: { authorization: token } }, true)
    const response = output.data
    if (response.status) {
      setImage(null)
      const res = response.data as FileUploadResponce
      setProfileData((prev) => {
        return { ...prev, image: res.url }
      })
      data.image = res.url
    } else {
      if (output.status === Logout) {
        logout()
        return
      }
      toast.error(response.message)
      setImage(null)
      setIsChange(false)
      setDisable(false)
      return
    }
  }

  async function profileUpdate(data: any) {
    const output: CommonResponseType<ProfileResponceType | ChangeTokenResponse> = await putRequest(endpoints.profile, data, { headers: { authorization: token } })
    const response = output.data
    if (response.status) {
      const res = response.data as ProfileResponceType
      //update store
      dispatch(setProfile(res ?? null))
      //update browser
      localStorage.setItem('profile', JSON.stringify(response.data))
      toast.success(response.message)
    }
    else {
      if (output.status === Logout) {
        logout()
        return
      }
      toast.error(response.message)
    }
  }

  async function updateProfile() {
    try {

      if (profileData.firstName === profile?.firstName && profileData.lastName === profile?.lastName && profileData.about === profile?.about && !image) {
        toast.error('Please Modify first.!')
        setIsChange(false)
        return
      }

      setDisable(true)
      let data: any = { ...profileData }

      if (image) {
        await imageUpload(data, image)
      }

      await profileUpdate(data)

      setImage(null)
      setDisable(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-[white] text-sm flex flex-col gap-8 sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] md:px-5 px-3 py-5 w-full h-full rounded-xl'>
      <div className='relative border boxshadow p-1 md:w-[25%] w-[35%] mx-auto rounded-full cursor-pointer'>
        {
          !image ? (<img src={profile?.image} onClick={() => setOpenModal(true)} className='w-full object-cover rounded-full' />) : (<img src={URL.createObjectURL(image)} className='w-full object-cover rounded-full' />)
        }
        <div onClick={clickHandler}
          className='absolute xs:bottom-0 xs:right-0 bottom-1 right-1 flex items-center rounded-full justify-center border xs:w-[30px] w-[20px] h-[20px] xs:h-[30px] bg-blue'>
          <GoPencil className='text-xs xs:text-lg' />
          <input type='file' accept='image/*' multiple={false} ref={imageRef} onChange={pickImageHandler} className='hidden' />
        </div>
      </div>
      <div className='relative w-full'>
        <input type='text' readOnly={true} value={profile?.email} className='cursor-not-allowed px-2 py-1 text-xs tracking-widest outline-none text-lowBlack border rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
        <p className='text-[10px] text-[black] bg-[white] absolute md:bottom-[24px] bottom-[19px] px-1 left-2'>Email</p>
      </div>
      <div className='flex md:flex-row flex-col items-center justify-between md:gap-2 gap-8'>
        <div className='relative md:w-[48%] w-full'>
          <input type='text' value={profileData?.firstName} name='firstName' onChange={changeHandler} disabled={disable}
            className='px-2 py-1 text-xs tracking-widest outline-none border text-lowBlack bg-[white] rounded-sm w-full md:h-[35px] h-[30px]' />
          <p className='text-[10px] absolute md:bottom-[24px] bottom-[19px] px-1 bg-[white] text-[black] left-2'>First Name</p>
        </div>
        <div className='relative md:w-[48%] w-full'>
          <input type='text' value={profileData?.lastName} name='lastName' onChange={changeHandler} disabled={disable}
            className='px-2 py-1 text-xs tracking-widest outline-none border text-lowBlack rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
          <p className='text-[10px] absolute md:bottom-[24px] bottom-[19px] px-1 bg-[white] text-[black] left-2'>Last Name</p>
        </div>
      </div>
      <div className='relative w-full'>
        <input type='text' value={profileData?.about} name='about' onChange={changeHandler} disabled={disable}
          className='px-2 py-1 text-xs tracking-widest outline-none border text-lowBlack rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
        <p className='text-[10px] text-[black] absolute md:bottom-[24px] bottom-[19px] px-1 bg-[white] left-2'>About</p>
      </div>
      <p className='text-xs text-[black]'>
        <span className='text-[red] mr-1'>*</span>
        Last Updated on {formatDate(profile?.updatedOn.toString())}
      </p>
      <button onClick={updateProfile} disabled={disable || !isChange}
        className={`${isChange ? 'cursor-pointer' : 'cursor-not-allowed'} bg-blue text-[white] mx-auto rounded-md sm:px-2 px-1 py-1 sm:py-[6px] flex items-center justify-between gap-2`}>
        {
          disable && <ImSpinner9 size={18} className='animate-spin' />
        }
        {
          disable ? 'Updating..' : 'Update'
        }
      </button>
      {/* display modal */}
      {
        openModal && (<DisplayModal type='image' src={!image ? profile?.image ?? '' : URL.createObjectURL(image)} setOpenModal={setOpenModal} />)
      }
    </div>
  )
}

export default Profile
