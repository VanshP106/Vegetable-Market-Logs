import React from 'react';
import './Aboutus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';

import logo from './logo.png'; 
import backgroundImage from './background.jpg'; 

const App = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const iconStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const navigateToURL = (url) => {
    window.location.href = url;
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '400px', marginRight: '60px' }} />
        <div>
          <h1><center>Fresh Vegies</center></h1>
          <h3><center>India's Favourite Vegetable Market</center></h3>
          <p>
            At vegetable market log, our goal is the faster door to door delivery of vegetables to make it convenient for our customers.
            Our mission is to build a website which will provide fresh vegetables across the country.
            We are committed to providing customers with a trusted shop for their vegetable shopping for all types of vegetables.
            With our convenient payment option, faster and safe delivery, and secure online transaction you can now shop faster
            within a few clicks without leaving home.
            At vegetable market log, our goal is the faster door to door delivery of vegetables to make it convenient for our customers. Our mission is to build a website which will provide fresh vegetables across the country. We are committed to providing customers with a trusted shop for their vegetable shopping for all types of vegetables. With our convenient payment option, faster and safe delivery, and secure online transaction you can now shop faster within a few clicks without leaving home.At vegetable market log, our goal is the faster door to door delivery of vegetables to make it convenient for our customers. Our mission is to build a website which will provide fresh vegetables across the country. We are committed to providing customers with a trusted shop for their vegetable shopping for all types of vegetables. With our convenient payment option, faster and safe delivery, and secure online transaction you can now shop faster within a few clicks without leaving home.
          </p>
        </div>
      </div>
      <div style={iconStyle}>
        <button onClick={() => navigateToURL("https://www.facebook.com/")} style={{ margin: '0 10px' }}>
          <FontAwesomeIcon icon={faFacebook} className="fa" />
        </button>
        <button onClick={() => navigateToURL("#")} style={{ margin: '0 10px' }}>
          <FontAwesomeIcon icon={faTwitter} className="fa" />
        </button>
        <button onClick={() => navigateToURL("#")} style={{ margin: '0 10px' }}>
          <FontAwesomeIcon icon={faInstagram} className="fa" />
        </button>
        <button onClick={() => navigateToURL("#")} style={{ margin: '0 10px' }}>
          <FontAwesomeIcon icon={faGoogle} className="fa" />
        </button>
      </div>
    </div>
  );
};

export default App;