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
import Chat from './pages/Chat';
import Chats from './pages/Chats';
import Search from './pages/Search';
import Follow from './pages/Follow';
import CreatePost from './pages/CreatePost';
import CreateChat from './pages/creatChat';
import Notifications from './pages/Notifications';
import Logout from './pages/Logout';
import Register from './pages/auth/Register';
import Register2 from './pages/auth/Register2';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
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
              path="/notifications"
              element={<Notifications />}
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
              path="/search"
              element={<Search />}
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
              path="/createchat"
              element={<CreateChat />}
            />
            <Route
              path="/posts/:id"
              element={<Post />}
            />
            <Route
              path="/users/:id"
              element={<User />}
            />
            <Route
              path="/chats/:id"
              element={<Chat />}
            />
            <Route
              path="/chats"
              element={<Chats />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
serviceWorkerRegistration.register();
reportWebVitals();
