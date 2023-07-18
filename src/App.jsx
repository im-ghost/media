import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userslice";
import Footer from './components/Footer';
function App() {
  const location = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  React.useEffect(()=>{
  const hideFooterRoutes = ['/login', '/register', '/register2'];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.includes(route)
  );
    if(!shouldHideFooter){
      if(!user){
        navigate("/login")
      }
    }
  },[location])
  return (
    <div className="dark">
      <ToastContainer />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
export default App;
