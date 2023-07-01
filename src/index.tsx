import React from 'react';
import "./app/firebase.ts"
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Home from "./pages/Home"
import Post from "./pages/Post"
import CreatePost from "./pages/CreatePost"
import Logout from "./pages/Logout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Register2 from "./pages/auth/Register2"
import Profile from "./pages/Profile"
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom"
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
     <Route index path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/logout" element={<Logout/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/register2" element={<Register2/>}/>
     <Route path="/profile" element={<Profile/>}/>
     <Route path="/createpost" element={<CreatePost/>}/>
     <Route path="/posts/:id" element={<Post />}/>
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
reportWebVitals(console.log);
