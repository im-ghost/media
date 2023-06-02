import React,{
  useEffect
} from 'react';
import eruda from "eruda";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/Footer"
function App() {
  useEffect(()=>{
    eruda.init()
  },[])
  return (
    <div className="bg-sky-300 text-amber-800 dark:bg-slate-900 dark:text-amber-100">
    <ToastContainer />
    <Footer />
        <Outlet />
    </div>
  );
}

export default App;
