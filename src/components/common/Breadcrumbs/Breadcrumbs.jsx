import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.label} className={isLast ? 'active' : ''}>
                            {index > 0 && <ChevronRight size={14} className="breadcrumb-separator" />}
                            {isLast ? (
                                <span aria-current="page">{item.label}</span>
                            ) : (
                                <Link to={item.path}>{item.label}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
