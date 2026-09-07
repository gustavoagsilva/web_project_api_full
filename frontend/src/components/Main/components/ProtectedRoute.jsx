import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isLoading, children }) {
  if (isLoading) {
    return;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
