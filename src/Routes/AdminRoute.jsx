import { Navigate, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import Loading from "@/Pages/Common/Loading";
import useUser from "@/hooks/useUser";

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const [DBuser] = useUser();
    const location = useLocation();
    if (isLoading || !DBuser) {
        return <Loading/>
    }
    if (user && (DBuser?.role === "admin")) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;