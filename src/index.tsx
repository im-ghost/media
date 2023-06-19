import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Home from "./pages/Home"
import Logout from "./pages/Logout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
import "./app/firebase.ts"
const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
     <Route index path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/logout" element={<Logout/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/profile" element={<Profile/>}/>
    </Route>
    )
  )
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
