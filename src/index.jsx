import './app/firebase.js';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Post from './pages/Post';
import User from './pages/User';
import Follow from './pages/Follow';
import CreatePost from './pages/CreatePost';
import Logout from './pages/Logout';
import Register from './pages/auth/Register';
import Register2 from './pages/auth/Register2';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
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
     
    </Route>
  )
);*/
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              path="/"
              index
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
              path="/follow"
              element={<Follow />}
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
            <Route
              path="/users/:id"
              element={<User />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
serviceWorkerRegistration.register();
reportWebVitals();
