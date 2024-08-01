import React, { ChangeEvent, FormEvent, useState } from 'react'
import { postRequest } from '../../lib/utils/HttpsClient'
import { endpoints } from '../../lib/utils/Endpoint'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { ImSpinner9 } from "react-icons/im";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { SignUpFormData } from '../../lib/types/auth';
import { toast } from 'react-toastify';

const SignUp: React.FC = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: '', lastName: '', email: '', password: '', otp: ''
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

    async function signup(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            if (isOtpSent) {
                setDisable(true)

                const responce = await postRequest(endpoints.signup, formData)

                if (responce.status) {
                    toast.success(responce.message)
                    navigate('/login')
                } else {
                    setDisable(false)
                    setIsOtpSent(false)
                    setFormData({ firstName: '', lastName: '', email: '', password: '', otp: '' })
                    toast.error(responce.message)
                }
            } else {
                toast.error("Network Error..!")
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function sendOtp() {
        try {
            if (formData.email === "") {
                toast.error("Email field is required..!")
            } else {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regex.test(formData.email)) {
                    toast.error("Enter an valid email..!")
                } else {
                    setDisable(true)
                    const responce = await postRequest(endpoints.requestotp, { email: formData.email })
                    if (responce.status) {
                        setIsOtpSent(true)
                        setDisable(false)
                        toast.success(responce.message)
                    } else {
                        setDisable(false)
                        setFormData((prev) => {
                            return { ...prev, email: '' }
                        })
                        toast.error(responce.message)
                    }
                }

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='backdrop-blur-sm w-full xs:my-5 xs:rounded-3xl rounded-none text-[white] bg-wrapper xs:h-max xs:w-[400px] px-5 py-10 tracking-widest text-md space-y-8'>
            <h1 className='text-center text-blue font-medium text-3xl mb-10 cursor-pointer'>ℝ𝕙𝕪𝕥𝕙𝕞𝕔𝕙𝕒𝕥</h1>
            <form className='space-y-10' onSubmit={signup}>
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
                                <input type='text' name='otp' readOnly={disable} value={formData.otp} onChange={changeHandler}
                                className='text-black w-full p-2 rounded-lg shadow-md outline-none text-sm tracking-wider' 
                                required={true} />
                                <div className='w-full flex gap-2 justify-center items-center'>
                                    {
                                        isOtpSent && <span className='text-[#00FF00]'><IoIosCheckmarkCircle size={25} /></span>
                                    }
                                    <button className='text-center text-sm cursor-pointer'
                                        disabled={disable}
                                        onClick={sendOtp}
                                    >
                                        {
                                            isOtpSent ? "Sent" : disable? "Sending..": "Send Otp"
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




