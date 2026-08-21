import { api } from "./axiosInstance";

// login 
const login = async ({email, password}) => {
    try {
        const res = await api.post("/login", {
            email, password
        });
        return res.data
    } catch (err) {
        throw err.response?.data?.message;
    }
}

// register 
const register = async ({email, password, role, fullName}) => {
    try {
        const res = await api.post("/register", {email, password, role, fullName} );
        return res
    } catch (err) {
        throw err.response?.data?.message;
    }
}

// get all users
const fetchUsers = async (page) => {
    return api.get(`/users?page=${page}&limit=10`);
}

// get authenticated user
const fetchAuthUser = async () => {
    return await api.get("/user");
}

// change user password 
const changePassword = async (newPassword, currentPass) => {
    try {
        const res = await api.put("/update-password", {newPassword, currentPass});
        return res
    } catch (err) {
        throw err.response?.data?.message;
    }
}

// forgot password 
const forgotPassword = async (email) => {
    try {
        const res = await api.post("/forgot-password",{
            email, clientURL: window.location.origin
        });
        return res
    } catch (err) {
        throw err.response?.data?.message;
    }
}

// reset pass 
const resetPassword = async (token, password) => {
    try {
        const res = await api.post("/reset-password", {token, password});
        return res
    } catch (err) {
        throw err.response?.data?.message;
    }
}
const deleteUser = async ({id}) => {
    try {
        const res = await api.delete(`/delete/${id}`)
        return res.data
    } catch (err) {
        throw err.response?.data?.message;
    }
}
export { login, register, fetchUsers, fetchAuthUser, forgotPassword,
     resetPassword, changePassword, deleteUser};