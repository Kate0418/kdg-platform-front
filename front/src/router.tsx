import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginIndex from './pages/login/Index'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginIndex />,
        children:[]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);