import React from 'react';
import '../styles/footer.css';
import Logo from '../images/Logo 2.png';
import Facebook from '../images/facebook.png';
import Instagram from '../images/instagram.png';
import Discord from '../images/Discord.png';

function footer() {
  return (
    <div className='footer'>
        <div className='top'>
            <div className='item'>
                <h2>Contact Us</h2>
                <p>sampleEmail@gmail.com</p>
                <p>+1 902 123 4567</p>
                <p>other stuff here</p>
            </div>
            <div className='item'>
                <h2>Socials</h2>
                <div className='social-link-box'>
                    <a href='https://www.instagram.com/dalchess/' target='_blank' rel='noopener noreferrer'><img src={ Instagram } alt='Instagram Logo - from Icons8.com' /></a>
                    <a href='https://www.facebook.com/dalchess' target='_blank' rel='noopener noreferrer'><img src={ Facebook } alt='Faceook Logo - from Icons8.com' /></a>
                    <a href='https://discord.gg/uMpjkG8qPD' target='_blank' rel='noopener noreferrer'><img src={ Discord } alt='Discord Logo - from Icons8.com' /></a>
                </div>
            </div>
            <div className='item'>
                <h2>Mailing List</h2>
                <a href='/'>Join Mailing List</a>
            </div>
        </div>
        <div className='bottom'>
            <div className='copy'>
                <p>&copy; 2024 dalchess.com</p>
            </div>
            <div className='logo'>
               <img src={ Logo } alt='Dal Chess Club Logo' />
            </div>
        </div>
    </div>
  )
}

export default footer