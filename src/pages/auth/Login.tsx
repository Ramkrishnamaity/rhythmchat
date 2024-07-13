import React, { useEffect } from 'react'
import { postRequest } from '../../lib/utils/HttpsClient'
import { endpoints } from '../../lib/utils/Endpoint'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {

  const navigate = useNavigate()

  async function getData() {

    const response = await postRequest(endpoints.login, { email: 'ramkrishnamaity531@gmail.com', password: '123456' })
    console.log(response, "response")
    if(response.status) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('profile', JSON.stringify(response.data.profile))
      navigate('/dashboard')
    }

  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      Login
    </div>
  )
}

export default Login
