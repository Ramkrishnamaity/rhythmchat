import React, { useEffect, useState } from 'react'
import { postRequest } from '../../lib/utils/HttpsClient'
import { endpoints } from '../../lib/utils/Endpoint'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { ImSpinner9 } from "react-icons/im";

const Login: React.FC = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(false)

  function clickHandler() {
    setShowPassword((prev) => !prev)
  }

  async function getData() {

    const response = await postRequest(endpoints.login, { email: 'ramkrishnamaity531@gmail.com', password: '123456' })
    console.log(response, "response")
    if (response.status) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('profile', JSON.stringify(response.data.profile))
      navigate('/dashboard')
    }

  }

  useEffect(() => {
    // getData()
  }, [])

  return (
    <div className='w-[98%] sm:w-[400px] tracking-widest text-lg space-y-8'>
      <h1 className='text-center font-medium text-3xl mb-10 cursor-pointer'>ℝ𝕙𝕪𝕥𝕙𝕞𝕔𝕙𝕒𝕥</h1>
      <form className='space-y-10'>
        <div className='space-y-3'>
          <div className='w-full space-y-2'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' readOnly={disable} className='bg-softWhite dark:bg-softBlack w-full p-3 rounded-lg shadow-md outline-none dark:text-softWhite text-softBlack text-sm tracking-wider' required={true} />
          </div>
          <div className='w-full space-y-2 relative'>
            <label htmlFor='password'>Password</label>
            <input type={showPassword ? 'text' : 'password'} name='password' readOnly={disable} className='bg-softWhite dark:bg-softBlack w-full p-3 rounded-lg shadow-md outline-none dark:text-softWhite text-softBlack text-sm tracking-wider' required={true} />
            <span className='absolute right-3 bottom-3' onClick={clickHandler}>
              {
                showPassword ? <GoEyeClosed size={20} /> : <GoEye size={20} />
              }
            </span>
          </div>
        </div>
        <button type='submit' disabled={disable} className='bg-richBlue w-full py-3 rounded-2xl shadow-sm flex gap-4 justify-center items-center'>
          {
            disable && <ImSpinner9 size={20} className='animate-spin' />
          }
          Login
        </button>
      </form>
      <div className='space-y-5'>
        <p className='text-center text-sm opacity-70'>Or Login with</p>
        <button
          disabled={disable}
          className='bg-softWhite dark:bg-softBlack w-full rounded-2xl flex gap-4 justify-center items-center p-3'
        >
          <span><FcGoogle size={25} /></span> Log in with Google
        </button>
        <p className='text-center text-sm opacity-70'>Don't have an account? <Link to="/register" className='text-richBlue'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login
