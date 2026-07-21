import { useContext } from 'react'
import AuthContext from '../context/AuthContext.js'
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
    const {token} = useContext(AuthContext); 
   return token ? <Outlet/> : <Navigate to="/login" replace/>
}

export default ProtectedRoute
