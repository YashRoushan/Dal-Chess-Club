import React, { useState } from 'react';
import '../styles/navbar.css';
import Logo from '../images/logo.png';
import Reorder from '../images/reorder.png';
import { Link } from 'react-router-dom';



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
                <Link to='/'><button className='dropbtn'>Home</button></Link>
            </div>
            <div className='dropdown'>
                <Link to='/about-us'><button className='dropbtn'>About Us</button></Link>
                <div className='dropdown-content'>
                    <a href='/'>Option 1</a>
                    <a href='/'>Option 2</a>
                    <a href='/'>Option 3</a>
                </div>
            </div>
            <div className='dropdown'>
                <Link to='/tournaments'><button className='dropbtn'>Tournaments</button></Link>
                <div className='dropdown-content'>
                    <a href='/'>Option 1</a>
                    <a href='/'>Option 2</a>
                    <a href='/'>Option 3</a>
                </div>
            </div>
            <div className='dropdown'>
                <Link to='/News'><button className='dropbtn'>News</button></Link>
                <div className='dropdown-content'>
                    <a href='/'>Option 1</a>
                    <a href='/'>Option 2</a>
                    <a href='/'>Option 3</a>
                </div>
            </div>
            <div className='dropdown'>
                <Link to='/faq'><button className='dropbtn'>FAQ</button></Link>
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