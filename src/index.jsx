import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App'; /*
import Home from 'pages/Home';
import Post from 'pages/Post';
import CreatePost from 'pages/CreatePost';
import Logout from 'pages/Logout';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import Register2 from 'pages/auth/Register2';
import Profile from 'pages/Profile';*/
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
import 'tailwindcss/tailwind.css';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyBUDXn0ympH2iaY9vzu_79yMdcS8wYw09o',
  authDomain: 'media-app-g.firebaseapp.com',
  projectId: 'media-app-g',
  storageBucket: 'media-app-g.appspot.com',
  messagingSenderId: '134965322289',
  appId: '1:134965322289:web:f2ab5e669af5eaafecab10',
  measurementId: 'G-JJZ9PB8M3H',
};
// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
/*const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route
        index
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<Logout />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/register2"
        element={<Register2 />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/createpost"
        element={<CreatePost />}
      />
      <Route
        path="/posts/:id"
        element={<Post />}
      />
    </Route>
  )
);*/
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App />}
      />
    </Routes>
  </BrowserRouter>
);
serviceWorkerRegistration.register();
reportWebVitals(console.log);
