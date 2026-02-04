import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductSlider.css';

const ProductSlider = ({ products }) => {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Calculate items per view roughly for dots (mobile: ~2, desktop: ~5)
    // We'll use a simplified check here or just listen to scroll position
    const isMobile = window.innerWidth <= 768;
    const itemsPerGroup = isMobile ? 2 : 5;
    const itemWidth = isMobile ? 190 : 230; // 160+30 or 200+30

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { current } = sliderRef;
            const scrollAmount = itemWidth * itemsPerGroup; // Scroll one "group" at a time

            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Handle scroll event to update active dot
    const handleScroll = () => {
        if (sliderRef.current) {
            const scrollLeft = sliderRef.current.scrollLeft;
            const newIndex = Math.round(scrollLeft / (itemWidth * itemsPerGroup));
            setActiveIndex(newIndex);
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', handleScroll);
            return () => slider.removeEventListener('scroll', handleScroll);
        }
    }, [itemWidth, itemsPerGroup]); // Dependencies for consistency

    const scrollToGroup = (index) => {
        if (sliderRef.current) {
            const scrollPos = index * itemWidth * itemsPerGroup;
            sliderRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
    };

    const totalGroups = Math.ceil(products.length / itemsPerGroup);

    return (
        <div className="product-slider-container">
            <button className="slider-arrow left" onClick={() => scroll('left')} aria-label="Scroll left">
                <ChevronLeft size={32} strokeWidth={1} />
            </button>

            <div className="product-slider" ref={sliderRef}>
                {products.map(product => (
                    <div key={product.id} className="slider-item">
                        <Link to={`/product/${product.id}`} className="slider-image-wrapper">
                            <img src={product.image} alt={product.name} />
                        </Link>
                        <Link to={`/product/${product.id}`} className="slider-item-link">
                            <h3 className="slider-item-title">{product.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>

            <button className="slider-arrow right" onClick={() => scroll('right')} aria-label="Scroll right">
                <ChevronRight size={32} strokeWidth={1} />
            </button>

            {/* Pagination Dots (Mobile Only via CSS) */}
            <div className="slider-dots">
                {Array.from({ length: totalGroups }).map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => scrollToGroup(index)}
                        aria-label={`Go to group ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductSlider;
