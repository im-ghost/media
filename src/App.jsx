import React, { useEffect } from 'react';
import eruda from 'eruda';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/register', '/register2'];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.includes(route)
  );
  useEffect(() => {
    eruda.init();
  }, []);
  return (
    <div className="dark flex h-screen w-screen justify-center bg m-0 p-0">
      <h1> App </h1>
      <ToastContainer />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
export default App;
