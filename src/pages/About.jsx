
import React from 'react';
import './About.css';
import Breadcrumbs from '../components/Breadcrumbs';

const About = () => {
    return (
        <div className="about-page">
            <div className="container">
                <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about' }]} />

                <section className="about-hero">
                    <h1 className="about-title">Our Story</h1>
                    <div className="about-content">
                        <div className="about-image">
                            <img src="/about/artisans.png" alt="Balinese Artisans" />
                        </div>
                        <div className="about-text">
                            <h2>Great Handicraft Bali Indonesia</h2>
                            <p>
                                Sjahlendra Handicraft is a local Balinese shop dedicated to furnishing your home with beautifully crafted, ethically-sourced products. Officially established in 2024, our journey began as a small-scale venture in 2018. But we are more than just an exporter—we are on a mission to bring hope and economic justice to the talented artisans of Bali.
                            </p>
                            <p>
                                Behind every piece of art lies a story of perseverance. Our artisans face significant challenges in marketing their creations, despite the exceptional craftsmanship they possess. At Sjahlendra Handicraft, we aim to bridge this gap by creating opportunities that enhance their welfare and bring hope for a better future.
                            </p>
                            <p>
                                We are deeply committed to ethical sourcing and sustainability. Our products are crafted with respect for both people and the planet. We prioritize fairness above all else—ensuring that our artisans receive fair wages and equal opportunities to grow their businesses.
                            </p>
                            <p>
                                Since 2018, our network of artisans has grown to include 55 suppliers as of 2024, and we are dedicated to expanding this community each year. Our vision goes beyond business growth; we hope to create a positive, long-term impact—empowering artisans to provide better education and nourishment for their children through the opportunities we help create.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-sustainability">
                    <div className="sustainability-content">
                        <h2>Sustainability & Impact</h2>
                        <p>
                            Our commitment to sustainability is unwavering. Our golden rule in packaging is simple: “no plastic.” We strive to develop sustainable alternatives to single-use products, not just to create a movement but to inspire awareness, especially among the younger generation.
                        </p>
                        <p>
                            At Sjahlendra Handicraft, we believe that every purchase makes a difference. By choosing our products, you are not only bringing beautiful craftsmanship into your home but also supporting the dreams and livelihoods of Balinese artisans. Together, we can create a better future—one handcrafted piece at a time.
                        </p>
                    </div>
                </section>

                <section className="about-team">
                    <h2 className="team-title">OUR TEAM</h2>
                    <div className="team-grid">
                        <div className="team-card">
                            <img src="/team-yuliana-new.png" alt="Yuliana" className="team-photo-card" />
                            <div className="team-info">
                                <h3>Yuliana</h3>
                                <p>Owner</p>
                            </div>
                        </div>
                        <div className="team-card">
                            <img src="/team-icha-new.png" alt="Icha" className="team-photo-card" />
                            <div className="team-info">
                                <h3>Icha</h3>
                                <p>Team Support</p>
                            </div>
                        </div>
                        <div className="team-card">
                            <img src="/team-layla-new.png" alt="Layla" className="team-photo-card" />
                            <div className="team-info">
                                <h3>Layla</h3>
                                <p>Marksman</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
