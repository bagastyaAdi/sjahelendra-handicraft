import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import './CategoryGrid.css';

const CategoryGrid = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('name', { ascending: true });

            if (error) throw error;
            setCategories(data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="category-section section container">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-grid">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="category-item skeleton">
                            <div className="category-image-container loading-shimmer"></div>
                            <div className="category-name loading-shimmer" style={{height: '24px', width: '60%', margin: '0 auto', marginTop: '10px'}}></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (categories.length === 0) return null;

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
                            <img src={cat.image_url || 'https://placehold.co/400x400/f0f0f0/999?text=No+Cover'} alt={cat.name} className="category-image" />
                        </div>
                        <h3 className="category-name">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
