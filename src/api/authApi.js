const baseUrl = import.meta.env.VITE_API_URL;
import axios from "axios";

const login = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post(`${baseUrl}/login`, {
            email,
            password
        });
        return res;
    } catch (err) {
        throw err.response?.data?.message;
    }
}
// register 
const register = async (email, password, role, fullName) => {
    try {
        const res = await axios.post(`${baseUrl}/register`, {
            email, password, role, fullName
        });
        return res
    } catch (err) {
        throw err.response?.data?.message;
    }
}

// get all users  
const fetchUsers = async () => {
    const token = localStorage.getItem("token");    
    try{
        const res = await axios.get(`${baseUrl}/users`, {
            headers : {
                Authorization : `bearer ${token}`
            }
        });
        return res
    }catch(err){
        throw err.response?.data?.message;
    }
}
// get authenticated user
const fetchAuthUser = async () => {
    const token = localStorage.getItem("token");    
    try{
        const res = await axios.get(`${baseUrl}/user`, {
            headers : {
                Authorization : `bearer ${token}`
            }
        });
        return res
    }catch(err){
        throw err.response?.data?.message;
    }
}
// forgot password 
const forgotPassword = async (email) => {
    try{
        const res = await axios.post(`${baseUrl}/forgot-password`, {
            email,
            clientURL: window.location.origin,
        })
        return res ;
    }
    catch(err){
       throw err.response?.data?.message;
    }
}
const resetPassword = async (token, password) => {
    try{
        const res = await axios.post(`${baseUrl}/reset-password`, {
            token,
            password
        })
        return res ;
    }
    catch(err){
       throw err.response?.data?.message;
    }
}
export { login, register, fetchUsers, fetchAuthUser, forgotPassword, resetPassword };