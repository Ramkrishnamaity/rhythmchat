import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import NotFound from "./pages/common/NotFound";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/common/Home";
import { useAppSelector } from "./redux/hooks";
import { getRequest } from "./lib/utils/HttpsClient";
import { endpoints } from "./lib/utils/Endpoint";
import Protector from "./components/common/Protector";

const App: React.FC = () => {

  const { profile, token } = useAppSelector(state => state.user)

  async function getProfile() {
    const response = await getRequest(endpoints.profile)
    if (response.status) {
      localStorage.setItem('profile', JSON.stringify(response.data))
    }
  }

  useEffect(() => {
    if (!profile && token) getProfile()
  }, [])

  return (
    <div className='flex justify-center items-center bg-[#23242E] w-[100vw] h-[100vh]'>

      <div className='flex justify-center items-center bg-lowBlack sm:rounded-2xl rounded-none lg:w-[410px] lg:h-[610px] md:w-[400px] md:h-[600px] sm:w-[380px] sm:h-[590px] w-full h-full'>
        <Routes>
          <Route path="/" element={<Protector><Home /></Protector>} />
          <Route path="/dashboard" element={<Protector><Dashboard /></Protector>} />
          <Route path="/login" element={<Protector><Login /></Protector>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
