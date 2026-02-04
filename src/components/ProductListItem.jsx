import React from 'react';
import { Heart, BarChart2 } from 'lucide-react';
import './ProductListItem.css';

const ProductListItem = ({ product }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isLiked = isInWishlist(product.id);

    const handleToggleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div className="product-list-item">
            <div className="product-list-image-container">
                <img src={product.image} alt={product.name} className="product-list-image" />
            </div>
            <div className="product-list-content">
                <Link to={`/products`} className="product-list-title-link">
                    <h3 className="product-list-title">{product.name}</h3>
                </Link>
                <div className="product-list-description">
                    {product.description}
                </div>

                <Link to={`/product/${product.id}`} className="btn btn-primary read-more-btn">Read more</Link>

                <div className="product-list-actions">
                    <button
                        className={`action-btn ${isLiked ? 'liked' : ''}`}
                        onClick={handleToggleLike}
                        style={{ color: isLiked ? 'var(--color-accent)' : 'inherit' }}
                    >
                        <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> Wishlist
                    </button>
                    {/* Compare button removed as requested */}
                </div>
            </div>
        </div>
    );
};

import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default ProductListItem;
