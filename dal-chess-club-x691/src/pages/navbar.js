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
    const [userIsDesktop, setUserIsDesktop] = useState(window.innerWidth > 650);
    const toggleWindowView = () => {
        window.innerWidth > 650 ? setUserIsDesktop(true) : setUserIsDesktop(false);
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
                    {userIsDesktop ? <Link to='/about-us'><button className='content'>Our Members</button></Link> : <Link to='/about-us'><button className='content'>{'>'} Our Members</button></Link>}
                    {userIsDesktop ? <Link to='/faq'><button className='content'>FAQ</button></Link> : <Link to='/faq'><button className='content'>{'>'} FAQ</button></Link>}
                </div>
            </div>
            <div className='dropdown'>
                <Link to='/tournaments'><button className='dropbtn'>Tournaments</button></Link>
            </div>
            <div className='dropdown'>
                <Link to='/news'><button className='dropbtn'>News</button></Link>
            </div>
            <div className='dropdown'>
            <Link to='/improve'><button className='dropbtn' >Improve</button></Link>
                <div className='dropdown-content'>
                    {userIsDesktop ? <Link to='/library'><button className='content'>Library</button></Link> : <Link to='/library'><button className='content'>{'>'} Library</button></Link>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar