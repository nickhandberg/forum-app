import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

const RequireAuth = () => {
    const { auth } = useAppContext();
    const location = useLocation();

    return auth?.username ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
