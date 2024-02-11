import React, { useState } from 'react';
import '../styles/navbar.css';
import Logo from '../images/logo.png';
import Reorder from '../images/reorder.png';



function NavBar() {    
    const [showDropdowns, setShowDropdowns] = useState(false);

    const toggleDropdowns = () => {
        setShowDropdowns(!showDropdowns);
    };

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
                <button className='dropbtn' onClick={() => { window.location.href='/about'}}>About Us</button>
                <div className='dropdown-content'>
                    <a href='/'>Option 1</a>
                    <a href='/'>Option 2</a>
                    <a href='/'>Option 3</a>
                </div>
            </div>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/tournaments'}}>Tournament</button>
                <div className='dropdown-content'>
                    <a href='/'>Option 1</a>
                    <a href='/'>Option 2</a>
                    <a href='/'>Option 3</a>
                </div>
            </div>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/news'}}>News</button>
                <div className='dropdown-content'>
                    <a href='/'>Option 1</a>
                    <a href='/'>Option 2</a>
                    <a href='/'>Option 3</a>
                </div>
            </div>
            <div className='dropdown'>
                <button className='dropbtn' onClick={() => { window.location.href='/faq'}}>FAQ</button>
                <div className='dropdown-content'>
                    <a href='/'>Option 1</a>
                    <a href='/'>Option 2</a>
                    <a href='/'>Option 3</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar