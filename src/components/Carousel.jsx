import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carousel.css';

const Carousel = () => {
    const slides = [
        {
            id: 1,
            image: "/hero-new.png",
            imageMobile: "/hero-new-mobile.png", // Specific mobile portrait image
            title: "Handcrafted Heritage",
            subtitle: "Sjahlendra Handicraft",
            description: "Explore our catalog of sustainable, fair-trade treasures.",
            category: "Catalog"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80&w=1920",
            title: "Traditional Elegance",
            subtitle: "Weavings & Textiles",
            description: "Bring the warmth of Indonesian heritage to your wardrobe.",
            category: "Fashion"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1920",
            title: "Modern Sanctuary",
            subtitle: "Serene Home Decor",
            description: "Curated pieces to create a peaceful atmosphere.",
            category: "Home Decor"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const handleShopClick = (category) => {
        navigate('/products', { state: { category } });
    };

    const nextSlide = () => {
        setCurrentSlide(current === slides.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(current === 0 ? slides.length - 1 : current - 1);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="carousel">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''} ${slide.id === 1 ? 'brand-slide' : ''}`}
                    style={{
                        backgroundImage: `url(${window.innerWidth <= 768 && slide.imageMobile ? slide.imageMobile : slide.image})`
                    }}
                >
                    <div className="carousel-overlay"></div>
                    <div className="carousel-content container">
                        {slide.id === 1 && (
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
                            onClick={() => {
                                if (slide.category === "Catalog") {
                                    window.open("https://view.publitas.com/", "_blank");
                                } else {
                                    handleShopClick(slide.category);
                                }
                            }}
                        >
                            {slide.category === "Catalog" ? "See Catalog" : `Shop ${slide.category}`}
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
