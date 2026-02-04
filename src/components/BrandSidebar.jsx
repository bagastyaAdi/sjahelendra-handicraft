import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './BrandSidebar.css';

const BrandSidebar = ({ brands, activeBrand, onSelectBrand, productCounts }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBrands = brands.filter(brand =>
        brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="brand-sidebar-component">
            <h3 className="brand-sidebar-title">BY BRANDS</h3>

            <div className="brand-search-container">
                <input
                    type="text"
                    className="brand-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={16} className="brand-search-icon" />
            </div>

            <ul className="brand-list">
                {filteredBrands.map(brand => (
                    <li key={brand} className="brand-item">
                        <label className="brand-checkbox-label">
                            <input
                                type="checkbox"
                                checked={activeBrand === brand}
                                onChange={() => onSelectBrand(activeBrand === brand ? "All" : brand)}
                                className="brand-checkbox"
                            />
                            <span className="brand-name">{brand}</span>
                            {productCounts && <span className="brand-count">({productCounts[brand] || 0})</span>}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrandSidebar;
