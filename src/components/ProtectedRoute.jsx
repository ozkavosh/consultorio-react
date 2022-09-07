import { Navigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext";

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAccount();
    if(!currentUser) return <Navigate to="/"/>
    return <>{children}</>
}

export default ProtectedRoute