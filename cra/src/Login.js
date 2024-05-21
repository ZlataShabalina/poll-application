import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await axios.get('http://localhost:8000/api/csrf/');
      setCsrfToken(response.data.csrfToken);
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/login/',
        { username, password },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      setMessage(response.data.message);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  if (isLoggedIn && username === "adminuser") {
    navigate('/admin');
  }
  else if(isLoggedIn && (username === "tommirintala" || username === "zlatashabalina" || username === "user")){
    navigate('/user')
  }

  return (
    <>
    <div className='login-container'>
    <div className='welcome'>
      <h1>Welcome to Pollme</h1>
    </div>
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <center>
          <button type="submit" className="submit-button">
            SEND
            <span></span>
          </button>
        </center>
        {message && <p className="white-text">{message}</p>} 
      </form>
    </div>
    </div>
    </>
  );
};

export default Login;
