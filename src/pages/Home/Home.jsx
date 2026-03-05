import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/sections/Carousel/Carousel';
import CategoryGrid from '../../components/sections/CategoryGrid/CategoryGrid';
import ProductSlider from '../../components/sections/ProductSlider/ProductSlider';
import PromoCarousel from '../../components/sections/PromoCarousel/PromoCarousel';
import { supabase } from '../../lib/supabaseClient';
import './Home.css';

const Home = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Fetch newest products
            const { data: newData, error: newError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(15);
            
            if (newError) throw newError;
            setNewArrivals(newData || []);

            // Fetch trending/best sellers
            const { data: trendData, error: trendError } = await supabase
                .from('products')
                .select('*')
                .eq('is_best_seller', true)
                .limit(15);
                
            if (trendError) throw trendError;
            
            // If not enough best sellers, fallback to oldest items just for demo variety
            if (!trendData || trendData.length < 4) {
                const { data: fallbackData } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: true })
                    .limit(15);
                setTrendingProducts(fallbackData || []);
            } else {
                setTrendingProducts(trendData || []);
            }
            
        } catch (error) {
            console.error('Error fetching home products:', error);
        } finally {
            setLoading(false);
        }
    };

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
            <section className="section new-arrivals-section">
                <div className="container">
                    <h2 className="section-title text-center">NEW ARRIVAL</h2>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
                    ) : (
                        <ProductSlider products={newArrivals} />
                    )}
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
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
                ) : (
                    <ProductSlider products={trendingProducts} />
                )}
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
