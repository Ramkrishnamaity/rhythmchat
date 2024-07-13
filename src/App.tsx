import React from "react";
import { Routes, Route } from 'react-router-dom'
import NotFound from "./pages/common/NotFound";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/common/Home";
import { useAppSelector } from "./redux/hooks";

const App: React.FC = () => {


  const user = useAppSelector(state => state.user.profile)


  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        {
          user ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )
        }

        <Route path="*" element={<NotFound />} />
      </Routes>


    </div>
  );
}

export default App;
