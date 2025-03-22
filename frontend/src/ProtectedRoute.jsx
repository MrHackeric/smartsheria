import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = sessionStorage.getItem("authToken"); // Ensure this matches login
  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
