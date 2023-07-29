import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/user/userSlice';
import Footer from './components/Footer';
function App() {
  const location = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const hideFooterRoutes = ['/login', '/register', '/register2'];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.includes(route)
  );
  React.useEffect(() => {
    if (!shouldHideFooter) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [location]);
  return (
    <div className="dark">
    <div className="bg">
      <ToastContainer />
      <Outlet />
      {!shouldHideFooter && <Footer />}
      </div>
    </div>
  );
}
export default App;
