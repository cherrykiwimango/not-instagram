import React from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'
import { Home, PlusCircle} from 'lucide-react';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      {/* Logo/Brand Section */}
      <div className="navbar-header">
        <h1 className="navbar-title">Menu &rarr;</h1>
      </div>
    
      <nav className="navbar-nav">
        <div className="nav-buttons">
          <button className="nav-button" onClick={()=>{navigate('/home')}}>
            <span className="nav-text">home</span> 
            <Home size={20}/>
          </button>
          
          <button className="nav-button" onClick={()=>{navigate('/post')}}>
            <span className="nav-text">post</span>
            <PlusCircle size={20}/>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar