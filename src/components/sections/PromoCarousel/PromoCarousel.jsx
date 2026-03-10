import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import "./PromoCarousel.css";

const fallbackSlides = [
  {
    id: 1,
    image_url: "/promo/banner1.png",
    title: "Summer Sale",
    subtitle: "Up to 50% Off on Selected Items",
    link: "/products",
    category: "FASHION",
  },
  {
    id: 2,
    image_url: "/promo/banner2.png",
    title: "New Collection",
    subtitle: "Sustainable Furniture for Modern Homes",
    link: "/products",
    category: "FURNITURE",
  },
];

const PromoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Start with fallback immediately — no skeleton flash, no layout shift
  const [slides, setSlides] = useState(fallbackSlides);

  // Fetch from Supabase in the background and swap in if data differs
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from("carousel_slides")
          .select("*")
          .eq("type", "promo")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          setSlides(data);
        }
      } catch {
        // Keep showing fallback slides — no action needed
      }
    };

    fetchSlides();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="promo-carousel">
      <div
        className="promo-slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="promo-slide">
            <img
              src={slide.image_url}
              alt={slide.title}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x400/f0f0f0/999?text=Promo+Image";
              }}
            />
            <div className="promo-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <Link
                to={slide.link || "/products"}
                state={{ category: slide.category }}
                className="promo-btn"
              >
                {slide.link_label || "Shop Now"}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        className="promo-arrow promo-left"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        className="promo-arrow promo-right"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={32} />
      </button>

      {slides.length > 1 && (
        <div className="promo-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`promo-dot${currentSlide === i ? " active" : ""}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoCarousel;
