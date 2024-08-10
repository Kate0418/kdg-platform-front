import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Top from './pages/Top'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/top',
    element: <Top />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);