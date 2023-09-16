import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const navigateToURL = (url) => {
    window.location.href = url;
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Fresh Veggies</h2>
          <p>
          Discover nature's finest at our fresh vegetable store. Savor vibrant flavors and enrich your meals with handpicked, locally sourced produce. Elevate your culinary journey with us today.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <button
              onClick={() => navigateToURL("https://www.facebook.com/")}
              className="icon"
            >
              <FontAwesomeIcon icon={faFacebook} className="fa" />
            </button>
            <button
              onClick={() => navigateToURL("#")}
              className="icon"
            >
              <FontAwesomeIcon icon={faTwitter} className="fa" />
            </button>
            <button
              onClick={() => navigateToURL("#")}
              className="icon"
            >
              <FontAwesomeIcon icon={faInstagram} className="fa" />
            </button>
            <button
              onClick={() => navigateToURL("#")}
              className="icon"
            >
              <FontAwesomeIcon icon={faGoogle} className="fa" />
            </button>
          </div>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@freshveggies.com</p>
          <p>Phone: +123-456-7890</p>
          <p>Address: Dehradun</p>
          <a href="/contact" className="contact-button">
            Get in Touch
          </a>
        </div>
      </div>
      <div className="download-app">
        <h3>Download the App</h3>
        <div className="app-buttons">
          <button
            onClick={() => navigateToURL("https://www.apple.com/app-store/")}
            className="app-button"
          >
            <FontAwesomeIcon icon={faApple} className="app-icon" />
            <span>Download on the App Store</span>
          </button>
          <button
            onClick={() => navigateToURL("https://play.google.com/store")}
            className="app-button"
          >
            <FontAwesomeIcon icon={faGooglePlay} className="app-icon" />
            <span>Get it on Google Play</span>
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Fresh Veggies. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;