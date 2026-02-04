import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Star, CheckCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return <div className="container" style={{ padding: '50px', textAlign: 'center' }}>Product not found</div>;
    }

    // Related Products Logic
    const relatedProducts = products
        .filter(p => p.mainCategory === product.mainCategory && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="product-detail-page container">
            <Breadcrumbs items={[
                { label: 'Home', path: '/' },
                { label: 'Shop', path: '/products' },
                { label: product.name, path: `/product/${product.id}` }
            ]} />
            <div className="product-detail-layout">
                {/* Left: Image */}
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>

                {/* Right: Info */}
                <div className="product-detail-info">
                    <h1 className="detail-title">{product.name}</h1>

                    {/* Rate Product */}
                    <div className="detail-rating">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} size={18} fill="#FFD700" color="#FFD700" />
                            ))}
                        </div>
                        <span className="rating-text">(5.0 Customer Reviews)</span>
                    </div>



                    {/* Status */}
                    <div className="detail-status">
                        <CheckCircle size={16} color="green" />
                        <span>In Stock</span>
                    </div>

                    {/* Description */}
                    <div className="detail-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                        <p style={{ marginTop: '10px' }}>
                            Handcrafted with care by our skilled artisans in Bali using sustainable materials.
                            Each piece is unique and carries the spirit of our heritage.
                        </p>
                    </div>

                    <p className="detail-category">Category: <span>{product.mainCategory} / {product.subCategory}</span></p>
                </div>
            </div>

            {/* Related Products */}
            <div className="related-products-section">
                <h2 className="section-title">Related Products</h2>
                <div className="products-grid">
                    {relatedProducts.map(related => (
                        <ProductCard key={related.id} product={related} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
