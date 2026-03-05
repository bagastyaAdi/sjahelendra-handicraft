import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="container">
                <div className="not-found-content">
                    <h1 className="not-found-code">404</h1>
                    <h2 className="not-found-title">Page Not Found</h2>
                    <p className="not-found-text">
                        We're sorry, the page you are looking for might have been removed, 
                        had its name changed, or is temporarily unavailable.
                    </p>
                    <Link to="/" className="btn btn-primary btn-back-home">
                        <ArrowLeft size={18} />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
