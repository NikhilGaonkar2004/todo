import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom' 
import Header from './compoents/Header'
import ContextProvider from './context/ContextProvider'

const App = () => {
  // Apply dark mode from localStorage on app mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  return (
    <ContextProvider>
      <div className="app-container">
        <Header/>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </ContextProvider>
  )
}

export default App