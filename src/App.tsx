import React,{
  useEffect
} from 'react';
import eruda from "eruda";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
function App() {
  useEffect(()=>{
    eruda.init()
  },[])
  return (
    <div>
    <ToastContainer />
        <Outlet />
    </div>
  );
}

export default App;
