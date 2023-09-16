import './loginstyle.css';
import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Create a context for managing authentication state
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        authContext.login(data.token);
        navigate('/');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="containerrr">
      <div className="logpage" >
        <div className="logo">
          <img src='veggies.gif' alt="" />
        </div>
        <div className="project-heading">
          <br />
          <center>
            Fresh Veggies
          </center>
          <br />
        </div>
        <form onSubmit={handleSubmit} className="log_class">
          <div className="userr">
            <input type="text" name="userName" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div className="userr">
            <input type="password" name="password" id="pwd" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="userr">
            <button className="btn">Login</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="newuserr">
          <Link to="/register">Sign up</Link>
        </div>
        <div className="social">
          <div className='fb'>
            <a href="https://www.facebook.com">
              <img src='social1.png' alt="" />
            </a>
          </div>
          <div className='ig'>
            <a href="https://www.instagram.com">
              <img src='social2.png' alt="" />
            </a>
          </div>
          <div className='x'>
            <a href="https://www.twitter.com">
              <img src='social3.jpg' alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AuthProvider, AuthContext }; // Export AuthProvider and AuthContext
export default LoginForm;
