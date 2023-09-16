import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./NavbarStyles.css";
import { SlBasket } from "react-icons/sl";
import { SlLogin } from "react-icons/sl";
import { AuthContext } from '../pages/login';

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }
    handlePredict = () =>{
        window.open('http://localhost:8501','_blank');
    }
    render() {
        return (
            <AuthContext.Consumer>
                {authContext => (
                    <nav className="qws">
                        <Link to="/">
                            <div className="logo">
                                <img src="veggies.gif" alt=""/>
                            </div>
                        </Link>
                        <div className="search_box">
                            <input type="text" className="input" placeholder="Fruits / Vegetables / Seasoning..." />
                            <button className="btn">Search</button>
                        </div>
                        <div>
                            <ul id="navbar" className={this.state.clicked ? "navbar active" : "navbar"}>
                                <li><Link to="/" className="active">HOME</Link></li>
                                <li><Link to="/shop">Shop</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/cart"><SlBasket /></Link></li>
                                <li>
                                    {authContext.token ? (
                                        <button onClick={authContext.logout}><SlLogin /> </button>
                                    ) : (
                                        <Link to="/login"><SlLogin /></Link>
                                    )}
                                </li>
                                <li>
                                    
                                    <button className="predict-button" onClick={this.handlePredict}>Predict</button> {/* Add a Predict button */}
                                    
                                </li>
                            </ul>
                        </div>
                        <div id="mobile" onClick={this.handleClick}>
                            <i id="bar" className={this.state.clicked ?
                                'fas fa-times' : 'fas fa-bars'}></i>
                        </div>
                    </nav>
                )}
            </AuthContext.Consumer>
        );
    }
}

export default Navbar;
