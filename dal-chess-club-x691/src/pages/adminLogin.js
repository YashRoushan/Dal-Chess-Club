import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminLogin.css';

//Method to handle validation
const handleLogin = (username, password) => {
    console.log('Username: ', username);
    console.log('Password: ', password);
}

const LoginForm = () => {
    //Checks state of the username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleLogin(username, password);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) { 
                const data = await response.json(); 
                console.log("Login Success:", data); 

                navigate('../adminLanding');
            } else {
                const errorData = await response.json();
                console.error("Login Error:", errorData);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };


    //Code for the form design
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

                <p className="forgot-password-text">
                <a href="/chessclub/forgotPassword">Forgot password?</a>
                </p>

                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm; 