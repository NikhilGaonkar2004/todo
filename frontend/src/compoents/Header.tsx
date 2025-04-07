import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Auth.context'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const Header = () => {
  const {user, logoutUser} = useAuth()
  const [darkMode, setDarkMode] = useState(false)

  // Check initial theme preference
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.body.classList.add('dark-mode')
    } else {
      setDarkMode(false)
      document.body.classList.remove('dark-mode')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    // Toggle state first
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    console.log("Toggling dark mode:", newDarkMode ? "ON" : "OFF");
    
    // Then update DOM and localStorage
    if (newDarkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
      console.log("Added dark-mode class to body:", document.body.classList.contains('dark-mode'));
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
      console.log("Removed dark-mode class from body:", !document.body.classList.contains('dark-mode'));
    }
    
    // Force repaint in some browsers
    document.body.style.display = 'none'
    document.body.offsetHeight // Trigger a reflow
    document.body.style.display = ''
    
    console.log("Body classes after toggle:", document.body.className);
  }

  // Determine navbar class based on dark mode
  const navbarClass = darkMode 
    ? "navbar navbar-expand-lg navbar-dark bg-dark dark-navbar" 
    : "navbar navbar-expand-lg navbar-dark bg-dark"

  return (
    <>
      <nav className={navbarClass}>
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand">
            Task Manager
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button 
                  onClick={toggleDarkMode} 
                  className="btn btn-link nav-link theme-toggle"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? <MdLightMode className="fs-4" /> : <MdDarkMode className="fs-4" />}
                </button>
              </li>
             
              {user && user.email ? 
                <li className="nav-item dropdown pe-5">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><Link className="dropdown-item" to="/profile">profile</Link></li>
                    <li><button onClick={logoutUser} className="dropdown-item" >Logout</button></li> 
                  </ul>
                </li>
                :
                <>
                  <li className="nav-item">
                    <Link to={'/auth/login'} className="btn btn-primary mx-2 login-btn">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/auth/register'} className="btn btn-warning mx-2 register-btn">Register</Link>
                  </li>
                </> 
              }
              <li className="nav-item">
                <Link to={'/'} className="nav-link home-link">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header