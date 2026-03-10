import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../../common/ProductCard/ProductCard";
import "./ProductSlider.css";

const MOBILE_BREAKPOINT = 768;

const ProductSlider = ({ products }) => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches,
  );

  // Keep isMobile in sync with viewport changes — no more stale window.innerWidth
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const itemsPerGroup = isMobile ? 2 : 5;
  const itemWidth = isMobile ? 190 : 230; // 160+30 or 200+30

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = itemWidth * itemsPerGroup; // Scroll one "group" at a time

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Handle scroll event to update active dot — inlined to satisfy exhaustive-deps
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const newIndex = Math.round(
        slider.scrollLeft / (itemWidth * itemsPerGroup),
      );
      setActiveIndex(newIndex);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [itemWidth, itemsPerGroup]);

  const scrollToGroup = (index) => {
    if (sliderRef.current) {
      const scrollPos = index * itemWidth * itemsPerGroup;
      sliderRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
  };

  const totalGroups = Math.ceil(products.length / itemsPerGroup);

  return (
    <div className="product-slider-container">
      <button
        className="slider-arrow left"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>

      <div className="product-slider" ref={sliderRef}>
        {products.map((product) => (
          <div key={product.id} className="slider-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        className="slider-arrow right"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      {/* Pagination Dots (Mobile Only via CSS) */}
      <div className="slider-dots">
        {Array.from({ length: totalGroups }).map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToGroup(index)}
            aria-label={`Go to group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
