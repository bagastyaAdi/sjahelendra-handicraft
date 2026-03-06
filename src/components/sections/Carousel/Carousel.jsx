import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import './Carousel.css';

const Carousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fallback slides in case DB is empty or not set up yet
    const fallbackSlides = [
        {
            id: 1,
            image_url: "/hero-new.png",
            image_mobile_url: "/hero-new-mobile.png",
            title: "Handcrafted Heritage",
            subtitle: "Sjahlendra Handicraft",
            description: "Explore our catalog of sustainable, fair-trade treasures.",
            category: "Catalog",
            link: "https://view.publitas.com/",
            link_label: "See Catalog"
        }
    ];

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const { data, error } = await supabase
                .from('carousel_slides')
                .select('*')
                .eq('type', 'hero')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setSlides(data && data.length > 0 ? data : fallbackSlides);
        } catch (err) {
            console.warn('Carousel: Using fallback slides', err);
            setSlides(fallbackSlides);
        } finally {
            setLoading(false);
        }
    };

    const handleShopClick = (slide) => {
        if (slide.link && (slide.link.startsWith('http') || slide.link.startsWith('https'))) {
            window.open(slide.link, '_blank');
        } else {
            navigate(slide.link || '/products', { state: { category: slide.category } });
        }
    };

    // Auto-advance
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    if (loading) {
        return (
            <div className="carousel-skeleton">
                <div className="skeleton-overlay"></div>
                <div className="skeleton-content container">
                    <div className="skeleton-loader logo-skeleton loading-shimmer"></div>
                    <div className="skeleton-loader subtitle-skeleton loading-shimmer"></div>
                    <div className="skeleton-loader title-skeleton loading-shimmer"></div>
                    <div className="skeleton-loader description-skeleton loading-shimmer"></div>
                    <div className="skeleton-loader button-skeleton loading-shimmer"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''} ${index === 0 ? 'brand-slide' : ''}`}
                    style={{
                        backgroundImage: `url(${window.innerWidth <= 768 && slide.image_mobile_url ? slide.image_mobile_url : slide.image_url})`
                    }}
                >
                    <div className="carousel-overlay"></div>
                    <div className="carousel-content container">
                        {index === 0 && (
                            <img
                                src="/logo.png"
                                alt="Sjahlendra Logo"
                                className="carousel-logo-overlay"
                                style={{ height: '80px', marginBottom: '20px', display: 'block' }}
                            />
                        )}
                        <span className="carousel-subtitle">{slide.subtitle}</span>
                        <h1 className="carousel-title">{slide.title}</h1>
                        <p className="carousel-description">{slide.description}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleShopClick(slide)}
                        >
                            {slide.link_label || 'Shop Now'}
                        </button>
                    </div>
                </div>
            ))}

            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
