import { Navigate, Outlet } from "react-router-dom";


export const DisplayError = ({
    token,
    redirectPath = '/login',
    children,
}) => {
    if (!token) {
        alert("You're not authorized to access this page")
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};