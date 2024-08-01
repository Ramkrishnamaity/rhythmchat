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
import SignUp from "./pages/auth/SignUp";

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
    <div className='z-0 flex justify-center items-center w-[100vw] min-h-[100vh]'>

      <Routes>
        <Route path="/" element={<Protector><Home /></Protector>} />
        <Route path="/dashboard" element={<Protector><Dashboard /></Protector>} />
        <Route path="/login" element={<Protector><Login /></Protector>} />
        <Route path="/signup" element={<Protector><SignUp /></Protector>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
