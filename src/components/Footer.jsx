import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col">
                    <div className="footer-logo-container">
                        <img src="/logo.png" alt="Sjahlendra Logo" className="footer-logo-img" />
                        <img src="/logo-text.png" alt="Sjahlendra Handicraft" className="footer-logo-text" />
                    </div>
                    <p className="footer-text">
                        Ethically sourced, sustainably crafted. Bringing the heart of Bali to your home.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Shop</h4>
                    <ul>
                        {/* Passing state to pre-select category when navigating to Shop */}
                        <li><Link to="/products" state={{ category: 'FURNITURE' }}>Furniture</Link></li>
                        <li><Link to="/products" state={{ category: 'HOME DEC' }}>Home Decor</Link></li>
                        <li><Link to="/products" state={{ category: 'FASHION' }}>Fashion</Link></li>
                        <li><Link to="/products">New Arrivals</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>About</h4>
                    <ul>
                        <li><Link to="/about">Our Story</Link></li>
                        <li><Link to="/about">Artisans</Link></li>
                        <li><Link to="/about">Sustainability</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Stay Connected</h4>
                    <div className="contact-details">
                        <p style={{ marginBottom: '10px' }}>+62 813-1666-3377</p>
                        <p>info@sjahlendra.com</p>
                    </div>
                    <p className="footer-copyright">
                        &copy; {new Date().getFullYear()} Sjahlendra Handicraft. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
