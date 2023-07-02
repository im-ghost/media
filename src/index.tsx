import React from 'react';
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
// Import the functions you need from the SDKs you need

// eslint-disable-next-line
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is options

// eslint-disable-next-line
const firebaseConfig = {
  apiKey: "AIzaSyBUDXn0ympH2iaY9vzu_79yMdcS8wYw09o",
  authDomain: "media-app-g.firebaseapp.com",
  projectId: "media-app-g",
  storageBucket: "media-app-g.appspot.com",
  messagingSenderId: "134965322289",
  appId: "1:134965322289:web:f2ab5e669af5eaafecab10",
  measurementId: "G-JJZ9PB8M3H"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
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
