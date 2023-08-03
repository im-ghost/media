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
  const history = useNavigate();
  const hideFooterRoutes = ['/login', '/register', '/register2'];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.includes(route)
  );
  React.useEffect(() => {
    console.log('app jsx');
    if (!shouldHideFooter) {
      if (!user) {
        history('/login');
      }
    }
  }, [location]);
  return (
    <div className="dark [position:relative]">
      <div className="bg relative mb-[2.1rem] [margin-bottom:2.1rem]">
        <ToastContainer />

        <Outlet />
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
export default App;
