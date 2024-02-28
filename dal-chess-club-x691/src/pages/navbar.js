import React, { useState } from 'react';
import '../styles/navbar.css';
import Logo from '../images/logo.png';
import Reorder from '../images/reorder.png';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';


function NavBar() {    
    const [showDropdowns, setShowDropdowns] = useState(false);

    const toggleDropdowns = () => {
        setShowDropdowns(!showDropdowns);
    };

    //checking if the user is in mobile or desktop
    const [userIsDesktop, setUserIsDesktop] = useState(window.innerWidth > 1280);
    const toggleWindowView = () => {
        window.innerWidth > 1280 ? setUserIsDesktop(true) : setUserIsDesktop(false);
    }

    useEffect(() => {
        window.addEventListener('resize', toggleWindowView);
        return () => {
            window.removeEventListener('resize', toggleWindowView);
        }
    }, [userIsDesktop]);

  return (
    <div className="navbar">
        <Link to='/'><img src={ Logo } alt='Dal Chess Club Logo' /></Link>
        <button className='mobile-toggle' onClick={toggleDropdowns}>
            <img src={ Reorder } alt='reorder icon' className='icon' />
        </button>
        <div className={`links ${showDropdowns ? 'show-dropdowns' : ''}`}>
            <div className='dropdown'>
                <Link to='/'><button className='dropbtn'>Home</button></Link>
            </div>
            <div className='dropdown'>
                <Link to='/about-us'><button className='dropbtn'>About Us</button></Link>
                <div className='dropdown-content'>
                    <Link to='/about-us'><button className='dropbtn'>Our Members</button></Link>
                    <Link to='/faq'><button className='dropbtn'>FAQ</button></Link>
                </div>
            </div>
            <div className='dropdown'>
                <Link to='/tournaments'><button className='dropbtn'>Tournaments</button></Link>
                <div className='dropdown-content'>
                    <Link to='/'><button className='dropbtn'>Option 1</button></Link>
                    <Link to='/'><button className='dropbtn'>Option 2</button></Link>
                    <Link to='/'><button className='dropbtn'>Option 3</button></Link>
                </div>
            </div>
            <div className='dropdown'>
                <Link to='/News'><button className='dropbtn'>News</button></Link>
            </div>
            <div className='dropdown'>
            <Link to='/improve'><button className='dropbtn' >Improve</button></Link>
                <div className='dropdown-content'>
                    <Link to='/library'><button className='dropbtn'>Library</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar