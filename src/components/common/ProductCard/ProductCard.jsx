import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isLiked = isInWishlist(product.id);

    const handleToggleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getStockInfo = () => {
        if (product.stock === null || product.stock === undefined) return null;
        if (product.stock === 0) return { label: 'Sold Out', className: 'stock-out' };
        if (product.stock <= 5) return { label: `Only ${product.stock} left`, className: 'stock-low' };
        return { label: `${product.stock} in stock`, className: 'stock-ok' };
    };

    const stockInfo = getStockInfo();

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img
                    src={product.image_url || product.image || 'https://placehold.co/400x400/f0f0f0/999?text=No+Image'}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />
                {/* Wishlist Button */}
                <button
                    className={`wishlist-btn ${isLiked ? 'active' : ''}`}
                    onClick={handleToggleLike}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                </button>

                {/* Best Seller Badge */}
                {product.is_best_seller && (
                    <span className="best-seller-badge">★ Best Seller</span>
                )}

                {/* Stock Badge */}
                {stockInfo && stockInfo.className === 'stock-out' && (
                    <div className="sold-out-overlay">
                        <span>Sold Out</span>
                    </div>
                )}
            </Link>

            <div className="product-info">
                <span className="product-category">{product.sub_category || product.main_category || ''}</span>
                <Link to={`/product/${product.id}`} className="product-title-link">
                    <h3 className="product-title">{product.name}</h3>
                </Link>
                <div className="product-bottom">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    {stockInfo && stockInfo.className !== 'stock-out' && (
                        <span className={`stock-badge ${stockInfo.className}`}>
                            {stockInfo.label}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
