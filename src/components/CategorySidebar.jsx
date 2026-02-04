import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './CategorySidebar.css';

const CategorySidebar = ({ activeCategory, onSelectCategory }) => {
    // Hierarchical Data Structure matched to specific user image
    // Hierarchical Data Structure
    const categoryStructure = [
        {
            name: "FASHION",
            sub: ["Clothing", "Batik Fan", "Jewellery"]
        },
        {
            name: "FURNITURE",
            sub: ["Stools & Tables"]
        },
        {
            name: "HOME DEC",
            sub: ["Dreamcatchers", "Chimes & Music", "Wood Carvings", "Stone Art", "Glass & Mosaic", "Accessories"]
        },
        {
            name: "OUTDOOR",
            sub: ["Garden Decor"]
        }
    ];

    // State to track expanded parents
    const [expanded, setExpanded] = useState({
        FASHION: true,
        FURNITURE: true,
        "HOME DEC": true
    });

    const toggleExpand = (name) => {
        setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <div className="category-sidebar-component">
            <h3 className="category-sidebar-title">CATEGORIES</h3>
            <ul className="category-root-list">
                {categoryStructure.map((mainCat) => {
                    const hasSub = mainCat.sub && mainCat.sub.length > 0;
                    const isExpanded = expanded[mainCat.name];
                    const isActiveMain = activeCategory === mainCat.name;

                    // Specific check for Jewellery to show dropdown arrow if needed, 
                    // though for now treating it as a flat sub.
                    // If Jewellery had sub-items it would be recursive, but based on image 
                    // it looks like a sub-item of Fashion, maybe with its own subs? 
                    // For now keeping flat to match the "list" visual.

                    return (
                        <li key={mainCat.name} className="category-root-item">
                            <div className="category-root-header">
                                <button
                                    className={`category-main-btn ${isActiveMain ? 'active' : ''}`}
                                    onClick={() => onSelectCategory(mainCat.name)}
                                >
                                    {mainCat.name}
                                </button>
                                {hasSub && (
                                    <button
                                        className="toggle-icon-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleExpand(mainCat.name);
                                        }}
                                    >
                                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                )}
                            </div>

                            {hasSub && isExpanded && (
                                <ul className="category-sub-list">
                                    {mainCat.sub.map(subCat => (
                                        <li key={subCat} className="category-sub-item">
                                            <button
                                                className={`category-sub-btn ${activeCategory === subCat ? 'active' : ''}`}
                                                onClick={() => onSelectCategory(subCat)}
                                            >
                                                {subCat}
                                            </button>

                                            {/* Visual helper for Jewellery if requested to have dropdown arrow */}
                                            {subCat === 'Jewellery' && (
                                                <ChevronDown size={14} className="sub-arrow-icon" style={{ color: '#999' }} />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CategorySidebar;
