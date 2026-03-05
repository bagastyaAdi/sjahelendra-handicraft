import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sj-manage/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
