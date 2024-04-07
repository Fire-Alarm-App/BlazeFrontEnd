import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa';
import { FaFire } from "react-icons/fa";
import { Button } from './Button';
import './Navbar.css';
import {IconContext} from 'react-icons/lib';
import { AuthPane } from './AuthPane';
import {subscribe} from '../script';

export default function Navbar() {
  const navigate = useNavigate()
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  }; 

  const signOut = () => {
  localStorage.removeItem('token'); // Remove the session token
  navigate('/'); // Navigate to sign-up page or '/' for home page
};

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true)
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false)
  const showButton = () => {
    if(window.innerWidth <= 960)
    {
        setButton(false)
    }
    else{
        setButton(true)
    }
  }

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    showButton();
    const token = localStorage.getItem('token');

    if (token) {
        fetch('http://localhost:4000/authenticateAdmin', {
            method: "POST",
            headers: {
                'Authorization': token
            }
        }).then(res => {
            setIsAdmin(res.ok);
        }).catch(err => {
            console.error('Error fetching admin status:', err);
            setIsAdmin(false);
        })
    }
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
    <IconContext.Provider value={{color: '#A9423F'}}>
     <div className="navbar">
       <div className = "navbar-container container">
        <Link to='/home' className = "navbar-logo" onClick={closeMobileMenu}>
            <FaFire className = 'nav-bar icon' />
         BLAZE
        </Link>
        <div className = "menu-icon" onClick={handleClick}>
            {click ? <FaTimes/> : <FaBars/>}
        </div> 
        <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={closeMobileMenu}>
        <li className = "nav-item">
            <Link to='/home' className="nav-links">
                Home
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link to='/services' className="nav-links" onClick={closeMobileMenu}>
                Admin Panel
              </Link>
            </li>
          )}
          <li className="nav-item">
              <Link to='/products' className="nav-links" onClick={closeMobileMenu}>
                  Settings
              </Link>
          </li>
       
          <li className = "nav-btn">
           {button ? (
            <div className="btn-link">

               <Button buttonStyle='btn--outline' onClick={signOut} >SIGN OUT</Button>
            </div>

           ): (
            <div className = "btn-link">
                <Button buttonStyle = 'btn--outline' onClick={signOut}  buttonSize='btn--mobile'> SIGN OUT</Button>
            </div>
           )}
          </li>

          <li className = "nav-btn">
               <Button buttonStyle='btn--outline' onClick={subscribe}>Subscribe</Button>
          </li>



        </ul>
       </div>
     </div>
     </IconContext.Provider>
    </>
  );
}
