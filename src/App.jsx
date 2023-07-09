import React from 'react';
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
  return (
    <div className="dark">
      <ToastContainer />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
export default App;
