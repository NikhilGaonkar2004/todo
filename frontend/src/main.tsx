import React from 'react'
import ReactDOM from 'react-dom/client' 
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.ts'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './App.css';
import './darkMode.css'; // Import the dark mode specific styles
import './bootstrap-override.css'; // Override Bootstrap styles for dark mode

// import ContextProvider from './context/ContextProvider.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ContextProvider> */}
    <ToastContainer/>
      <RouterProvider router={router}/> 
    {/* </ContextProvider> */}
  </React.StrictMode>,
)
