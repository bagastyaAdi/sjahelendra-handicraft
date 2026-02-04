
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="wishlist-page container">
            <header className="wishlist-header">
                <h1>My Wishlist</h1>
                <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
            </header>

            {wishlist.length === 0 ? (
                <div className="empty-wishlist">
                    <h2>Your wishlist is empty</h2>
                    <p>Save items you love here for later.</p>
                    <Link to="/products" className="btn-primary">Start Shopping</Link>
                </div>
            ) : (
                <div className="product-grid">
                    {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} hidePrice={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
