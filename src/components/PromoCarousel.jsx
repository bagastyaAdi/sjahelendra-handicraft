
import React, { useState, useEffect } from 'react';
import './PromoCarousel.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        image: '/promo/banner1.png',
        title: 'Summer Sale',
        subtitle: 'Up to 50% Off on Selected Items',
        link: '/products',
        category: 'FASHION'
    },
    {
        id: 2,
        image: '/promo/banner2.png',
        title: 'New Collection',
        subtitle: 'Sustainable Furniture for Modern Homes',
        link: '/products',
        category: 'FURNITURE'
    }
];

const PromoCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="promo-carousel">
            <div className="promo-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide) => (
                    <div key={slide.id} className="promo-slide">
                        <img src={slide.image} alt={slide.title} />
                        <div className="promo-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.subtitle}</p>
                            <Link to={slide.link} state={{ category: slide.category }} className="promo-btn">
                                Shop Now
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
