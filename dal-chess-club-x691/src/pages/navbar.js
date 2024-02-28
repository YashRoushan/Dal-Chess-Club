import React, { useState } from 'react';
import '../styles/navbar.css';
import Logo from '../images/logo.png';
import Reorder from '../images/reorder.png';
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
        <a href='/'><img src={ Logo } alt='Dal Chess Club Logo' /></a>
        <button className='mobile-toggle' onClick={toggleDropdowns}>
            <img src={ Reorder } alt='reorder icon' className='icon' />
        </button>
        <div className={`links ${showDropdowns ? 'show-dropdowns' : ''}`}>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/'}}>Home</button>
            </div>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/about-us'}}>About Us</button>
                <div className='dropdown-content'>
                    {userIsDesktop ? <a href='/about-us'>Our Members</a> : <a href='/about-us'>- Our Members</a>}
                    {userIsDesktop ? <a href='/faq'>FAQ</a> : <a href='/faq'>- FAQ</a>}
                </div>
            </div>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/tournaments'}}>Tournaments</button>
            </div>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/news'}}>News</button>
            </div>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/improve'}}>Improve</button>
                <div className='dropdown-content'>
                    {userIsDesktop ? <a href='/library'>Library</a> : <a href='/library'>- Library</a>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar