import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/adminLogin.css';

const handleLogin = (username, password) => {
    console.log('Username: ', username);
    console.log('Password: ', password);
}

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(username, password);
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <div className="input-username">
                        <label htmlFor="username">Username</label>
                        <br></br>
                        <input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="input-password">
                        <label htmlFor="password">Password</label>
                        <br></br>
                        <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <Link className='forget-password'>Forget Password?</Link>
                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm; 