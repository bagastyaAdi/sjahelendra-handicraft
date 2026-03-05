import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content container">
                <span className="hero-subtitle">Handcrafted in Bali</span>
                <h1 className="hero-title">Sustainable Art <br /> for Your Home</h1>
                <p className="hero-description">
                    Discover our collection of ethically sourced furniture and decor.
                    Bringing the spirit of Bali to your doorstep.
                </p>
                <button className="btn btn-primary">Explore Collection</button>
            </div>
            <div className="hero-image-overlay"></div>
        </section>
    );
};

export default Hero;
