import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import PromoCarousel from '../components/PromoCarousel';
import ProductSlider from '../components/ProductSlider';
import CategoryGrid from '../components/CategoryGrid';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
    // Get latest products for New Arrivals
    const newArrivals = products.slice(0, 15); // Increased to show more products in slider

    // Get Trending Products (using a different slice for variety)
    const trendingProducts = products.slice(15, 30);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <Carousel />
            </section>

            {/* Promo Banner Carousel */}
            <section className="container section-promo">
                <PromoCarousel />
            </section>

            {/* New Arrivals Slider */}
            {/* New Arrivals Slider */}
            <section className="section new-arrivals-section">
                <div className="container">
                    <h2 className="section-title text-center">NEW ARRIVAL</h2>
                    <ProductSlider products={newArrivals} />
                </div>
            </section>

            {/* Collections/Categories Highlight */}
            <CategoryGrid />

            {/* Static Promo Banner */}
            <section className="section container text-center">
                <div className="static-promo">
                    <img src="/promo/mid-banner.png" alt="Handcrafted Perfection" className="w-full rounded-lg shadow-md" style={{ borderRadius: '8px', width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} />
                </div>
            </section>

            {/* Trending Products Slider */}
            <section className="section container">
                <h2 className="section-title text-center">TRENDING PRODUCTS</h2>
                <ProductSlider products={trendingProducts} />
            </section>

            {/* About Preview */}
            <section className="about-preview section">
                <div className="container">
                    <div className="about-content">
                        <h2 className="section-title">Rooted in Tradition</h2>
                        <p>
                            Sjahlendra Handicraft was born from a deep respect for Balinese artistry.
                            We partner directly with local artisans to create pieces that tell a story.
                            Every item is handmade using sustainable materials, ensuring that while we
                            beautify your home, we also protect our planet.
                        </p>
                        <Link to="/about" className="btn btn-outline" style={{ marginTop: '30px', display: 'inline-block' }}>Read Our Story</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
