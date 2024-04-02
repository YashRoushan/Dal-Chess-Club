import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminLogin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginForm = () => {
    //Checks state of the username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
            if(!username) {
                toast.error("Username is Empty");
            }
            else if(!password) {
                toast.error("Password is Empty");
            }
            else {
                try {
                    var response= await fetch('http://localhost:5000/api/login');
                    var data = await response.json();
                    var user = JSON.parse(data);
                    if (user[0].username === username) { 
                        if(user[0].password === password) {
                            navigate('../adminLanding');
                        }
                        else {
                            toast.error("Username or Password is Incorrect");
                        }
                    } else {
                        toast.error("Username or Password is Incorrect");
                    }
                }
                catch (error) {
                    console.error("Fetch Error:", error);
                }
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
                <ToastContainer />
            </form>
        </div>
    );
};

export default LoginForm; 