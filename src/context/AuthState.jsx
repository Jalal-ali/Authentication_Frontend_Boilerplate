// import { useContext } from 'react'
import { useState } from 'react';
import AuthContext from './AuthContext';

const AuthState = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  }
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
