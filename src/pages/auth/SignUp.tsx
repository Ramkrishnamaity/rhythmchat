import React, { ChangeEvent, useState } from 'react'
import { postRequest } from '../../lib/utils/HttpsClient'
import { endpoints } from '../../lib/utils/Endpoint'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { ImSpinner9 } from "react-icons/im";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { SignUpFormData } from '../../lib/types/auth';

const SignUp: React.FC = () => {

    //   const navigate = useNavigate()
    //   const [showPassword, setShowPassword] = useState<boolean>(false)
    //   const [disable, setDisable] = useState<boolean>(false)
    //   const [formData, setFormData] = useState<LoginFormData>({
    //     email: '', password: ''
    //   })

    //   function clickHandler() {
    //     setShowPassword((prev) => !prev)
    //   }

    //   function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    //     setFormData((prev) => {
    //       return {...prev, [e.target.name]: e.target.value}
    //     })
    //   }

    //   async function login() {

    //     setDisable(true)

    //     const response = await postRequest(endpoints.login, formData)
    //     console.log(response, "response")
    //     if (response.status) {
    //       localStorage.setItem('token', response.data.token)
    //       localStorage.setItem('profile', JSON.stringify(response.data.profile))
    //       navigate('/dashboard')
    //     } else {
    //       setDisable(false)
    //       setFormData({email: '', password: ''})
    //     }

    //   }

    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: '', lastName: '', email: '', password: ''
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(false)

    function clickHandler() {
        setShowPassword((prev) => !prev)
    }

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    // function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    //     setEmail(e.target.value)
    // }

    //   async function signUpHandler(formData: FormData) {
    //     try {
    //       setDisable(true)

    //       const email = formData.get("email") as string
    //       const password = formData.get("password") as string
    //       const firstName = formData.get("firstName") as string
    //       const lastName = formData.get("lastName") as string
    //       const otp = formData.get("otp") as string


    //       const responce = await siginup({ email, password, otp, firstName, lastName })

    //       if(responce.status) {
    //         setDisable(false)
    //         setIsOtpSent(false)
    //         toast.success(responce.message)
    //         router.push('/dashboard')
    //       } else {
    //         toast.error(responce.message)
    //         setDisable(false)
    //         setIsOtpSent(false)
    //       }
    //     } catch (error) {
    //       setDisable(false)
    //       setIsOtpSent(false)
    //       console.log(error)
    //     }
    //   }

    //   async function sendOtpHandler() {
    //     try{

    //       if(email === "") {
    //         toast.error("Email field is required.")
    //       } else {
    //         const responce = await sendotp({email})
    //         if(responce.status) {
    //           setIsOtpSent(true)
    //           toast.success(responce.message)
    //         } else {
    //           toast.error(responce.message)
    //         }
    //       }

    //     } catch(error) {
    //       console.log(error)
    //     }
    //   }


    return (
        <div className='w-full xs:my-5 xs:rounded-3xl rounded-none text-[white] bg-wrapper xs:h-max xs:w-[400px] px-5 py-10 tracking-widest text-md space-y-8'>
            <h1 className='text-center font-medium text-3xl mb-10 cursor-pointer'>ℝ𝕙𝕪𝕥𝕙𝕞𝕔𝕙𝕒𝕥</h1>
            <form className='space-y-10'>
                <div className='space-y-3'>
                    <div className='xs:flex-row flex flex-col gap-1'>
                        <div className='w-full space-y-2'>
                            <label htmlFor='firstName'>First Name</label>
                            <input type='text' name='firstName' readOnly={disable} value={formData.firstName}
                                onChange={changeHandler}
                                className='text-[black] w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider'
                                required={true} />
                        </div>
                        <div className='w-full space-y-2'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input type='text' name='lastName' readOnly={disable} value={formData.lastName}
                                onChange={changeHandler}
                                className='text-[black] w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider'
                                required={true} />
                        </div>
                    </div>
                    <div className='w-full space-y-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' value={formData.email} readOnly={isOtpSent}
                            onChange={changeHandler}
                            className='text-[black] w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider'
                            required={true} />
                    </div>
                    <div className='w-full space-y-2 relative'>
                        <label htmlFor='password'>Password</label>
                        <input type={showPassword ? 'text' : 'password'} readOnly={disable} name='password' value={formData.password}
                            onChange={changeHandler}
                            className='text-[black] w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider'
                            required={true} />
                        <span className='absolute text-[black] right-3 bottom-2' onClick={clickHandler}>
                            {
                                showPassword ? <GoEyeClosed size={20} /> : <GoEye size={20} />
                            }
                        </span>
                    </div>

                    <div className='flex gap-1'>
                        <div className='w-full space-y-2'>
                            <label htmlFor='otp'>OTP</label>
                            <div className='flex gap-1'>
                                <input type='text' name='otp' readOnly={disable} className='text-black w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider' required={true} />
                                <div className='w-full flex gap-2 justify-center items-center'>
                                    {
                                        isOtpSent && <span className='text-[#00FF00]'><IoIosCheckmarkCircle size={25} /></span>
                                    }
                                    <button className='text-center text-sm cursor-pointer'
                                        disabled={disable}
                                    >
                                        {
                                            isOtpSent ? "Sent" : "Send Otp"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <button type='submit' disabled={disable} className='bg-black w-full py-3 rounded-2xl shadow-sm flex gap-4 justify-center items-center'>
                    <span>
                        {
                            disable && <ImSpinner9 size={20} className='animate-spin' />
                        }
                    </span>
                    Register
                </button>
            </form>
            <div className='space-y-5'>
                <p className='text-center text-sm opacity-70'>Or Sign up with</p>
                <button
                    disabled={disable}
                    className='bg-black  w-full cursor-pointer rounded-2xl flex gap-4 justify-center items-center p-3'
                >
                    <span><FcGoogle size={25} /></span> Sign up with Google
                </button>
                <p className='text-center text-sm opacity-70'>Already registerd? <Link to="/login" className='text-richBlue'>Log in</Link></p>
            </div>
        </div>
    )
}

export default SignUp
