import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './registerstyle.css';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { username, email, password, confirmPassword, gender } = formData;
    
    if (!username || !email || !password || !confirmPassword || !gender) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, gender })
      });

      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  return (
    <div className="regpage">
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
        <div className="userr">Name
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        </div>
        <div className="userr">Email
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="userr">Create Password
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        </div>
        <div className="userr">ReEnter Password
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />
        </div>
        <div className="userr">
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className="newuserr">
        <Link to="/login">Already have an account? Login</Link>
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
  );
}

export default RegisterForm;
