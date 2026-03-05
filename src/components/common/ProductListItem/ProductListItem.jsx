import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../../context/WishlistContext';
import './ProductListItem.css';

const ProductListItem = ({ product }) => {
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

    const getStockLabel = () => {
        if (product.stock === null || product.stock === undefined) return null;
        if (product.stock === 0) return <span className="list-stock out">Sold Out</span>;
        if (product.stock <= 5) return <span className="list-stock low">Only {product.stock} left</span>;
        return <span className="list-stock ok">{product.stock} in stock</span>;
    };

    return (
        <div className="product-list-item">
            <Link to={`/product/${product.id}`} className="product-list-image-container">
                <img
                    src={product.image_url || product.image || 'https://placehold.co/300x300/f0f0f0/999?text=No+Image'}
                    alt={product.name}
                    className="product-list-image"
                    loading="lazy"
                />
                {product.is_best_seller && (
                    <span className="list-best-seller">★ Best Seller</span>
                )}
            </Link>
            <div className="product-list-content">
                <span className="list-category">{product.sub_category || product.main_category || ''}</span>
                <Link to={`/product/${product.id}`} className="product-list-title-link">
                    <h3 className="product-list-title">{product.name}</h3>
                </Link>
                <p className="product-list-description">{product.description}</p>
                <div className="product-list-bottom">
                    <span className="list-price">{formatPrice(product.price)}</span>
                    {getStockLabel()}
                </div>
                <div className="product-list-actions">
                    <Link to={`/product/${product.id}`} className="btn btn-primary read-more-btn">View Details</Link>
                    <button
                        className={`action-btn icon-only-btn ${isLiked ? 'liked' : ''}`}
                        onClick={handleToggleLike}
                        aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                        title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;
