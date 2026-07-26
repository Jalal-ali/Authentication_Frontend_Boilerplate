import { useContext } from 'react'
import AuthContext from '../context/AuthContext.js'
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner.jsx';
const ProtectedRoute = () => {
    const { user, userLoading } = useContext(AuthContext);
    if (userLoading) {
        return <LoadingSpinner />
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default ProtectedRoute
