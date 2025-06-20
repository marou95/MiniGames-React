import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAuth = false, requireCompletion = false, requireFinalCode = false }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const gamesCompleted = localStorage.getItem('gamesCompleted') === 'true';
  const isAuthenticatedFinalCode = localStorage.getItem('isAuthenticatedFinalCode') === 'true';

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireCompletion && (!isAuthenticated || !gamesCompleted)) {
    return <Navigate to="/game" replace />;
  }

  if (requireFinalCode && (!isAuthenticated || !gamesCompleted || !isAuthenticatedFinalCode)) {
    return <Navigate to="/accesscode" replace />;
  }
  return children;
};

export default ProtectedRoute;