import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryGrid.css';

const categories = [
    { name: "Bag", image: "https://images.unsplash.com/photo-1590874102051-b548b4352199?auto=format&fit=crop&q=80&w=400" },
    { name: "Batik Fan", image: "https://images.unsplash.com/photo-1610998951806-03f422e6c1e5?auto=format&fit=crop&q=80&w=400" },
    { name: "Clothing", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=400" },
    { name: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb0537bf?auto=format&fit=crop&q=80&w=400" },
    { name: "Furniture", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400" },
    { name: "Bamboo", image: "https://images.unsplash.com/photo-1621256247963-35f999907c62?auto=format&fit=crop&q=80&w=400" },
    { name: "Bird Bug House", image: "https://images.unsplash.com/photo-1544970631-155097327342?auto=format&fit=crop&q=80&w=400" },
    { name: "Dreamcatcher", image: "https://images.unsplash.com/photo-1563299796-b729d0af54a5?auto=format&fit=crop&q=80&w=400" },
    { name: "Ottomans", image: "https://images.unsplash.com/photo-1505393081532-d85c54215286?auto=format&fit=crop&q=80&w=400" },
    { name: "Glass On Wood", image: "https://images.unsplash.com/photo-1628151016008-5d2729a65d33?auto=format&fit=crop&q=80&w=400" }, // Reused buddha img for decor
    { name: "Resin", image: "https://images.unsplash.com/photo-1615456485802-bd9ee263628e?auto=format&fit=crop&q=80&w=400" },
    { name: "Glass Suncatcher", image: "https://images.unsplash.com/photo-1528148970591-62d22b07e4c2?auto=format&fit=crop&q=80&w=400" }
];

const CategoryGrid = () => {
    const navigate = useNavigate();

    return (
        <section className="category-section section container">
            <h2 className="section-title">Shop by Category</h2>
            <div className="category-grid">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="category-item"
                        onClick={() => navigate('/products', { state: { category: cat.name } })}
                    >
                        <div className="category-image-container">
                            <img src={cat.image} alt={cat.name} className="category-image" />
                        </div>
                        <h3 className="category-name">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
