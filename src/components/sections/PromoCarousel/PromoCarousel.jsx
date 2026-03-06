
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import './PromoCarousel.css';

const PromoCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackSlides = [
        {
            id: 1,
            image_url: '/promo/banner1.png',
            title: 'Summer Sale',
            subtitle: 'Up to 50% Off on Selected Items',
            link: '/products',
            category: 'FASHION'
        },
        {
            id: 2,
            image_url: '/promo/banner2.png',
            title: 'New Collection',
            subtitle: 'Sustainable Furniture for Modern Homes',
            link: '/products',
            category: 'FURNITURE'
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
                .eq('type', 'promo')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setSlides(data && data.length > 0 ? data : fallbackSlides);
        } catch (err) {
            console.warn('PromoCarousel: Using fallback slides', err);
            setSlides(fallbackSlides);
        } finally {
            setLoading(false);
        }
    };

    // Auto-advance
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    };

    if (loading) {
        return (
            <div className="promo-carousel-skeleton">
                <div className="promo-skeleton-loader loading-shimmer"></div>
            </div>
        );
    }
    
    if (slides.length === 0) return null;

    return (
        <div className="promo-carousel">
            <div className="promo-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide) => (
                    <div key={slide.id} className="promo-slide">
                        <img 
                            src={slide.image_url} 
                            alt={slide.title} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/800x400/f0f0f0/999?text=Promo+Image';
                            }}
                        />
                        <div className="promo-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.subtitle}</p>
                            <Link to={slide.link || '/products'} state={{ category: slide.category }} className="promo-btn">
                                {slide.link_label || 'Shop Now'}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <button className="promo-arrow promo-left" onClick={prevSlide} aria-label="Previous Slide">
                <ChevronLeft size={32} />
            </button>
            <button className="promo-arrow promo-right" onClick={nextSlide} aria-label="Next Slide">
                <ChevronRight size={32} />
            </button>

            <div className="promo-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`promo-dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PromoCarousel;
