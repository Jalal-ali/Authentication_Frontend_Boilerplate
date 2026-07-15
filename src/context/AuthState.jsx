import { useEffect, useState, } from 'react';
import AuthContext from './AuthContext';
import { fetchAuthUser } from '../api/authApi';

const AuthState = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      if(!token){
        setUserLoading(false);
        return
      }
      try{
        setUserLoading(true);
        const res = await fetchAuthUser(token);
        console.log("Fetched user:", res.data.user);
        setUser(res.data.user);
      }catch(err){
        alert("Error:", err.response?.data?.message);
      }
      finally{
        setUserLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    // setUser(user);
  }
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ token, login, logout, user, userLoading }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
