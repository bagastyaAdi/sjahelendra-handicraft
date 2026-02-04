import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, hidePrice }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isLiked = isInWishlist(product.id);

    const handleToggleLike = (e) => {
        e.preventDefault(); // Prevent link click if wrapped
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                <button
                    className={`wishlist-btn ${isLiked ? 'active' : ''}`}
                    onClick={handleToggleLike}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                </button>
            </Link>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <Link to={`/product/${product.id}`} className="product-title-link">
                    <h3 className="product-title">{product.name}</h3>
                </Link>
                {/* Price removed globally as per request */}
            </div>
        </div>
    );
};

export default ProductCard;
