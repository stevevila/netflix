import React, { useEffect, useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, [])

  return (
    <div className={`nav ${show && 'nav_black'}`}>
      <div className='nav_contents'>
        <img onClick={() => navigate('/')} className='nav_logo' src="/logo.svg" alt="Logo de Netflix" />
        <img onClick={() => navigate('/profile')} className='nav_avatar' src="/Netflix-avatar.png" alt="Avatar de Netflix" />
      </div>
    </div>
  )
}

export default Nav;
