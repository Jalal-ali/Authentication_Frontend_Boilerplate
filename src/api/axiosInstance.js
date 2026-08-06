const baseUrl = import.meta.env.VITE_API_LOCAL_URL 
import axios from "axios";

const api = axios.create({
    baseURL: baseUrl,
    // baseURL: "http://localhost:3000/api/v1",
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})
api.interceptors.response.use((response) => {
    return response
},
    async (error) => {
        const originalReq = error.config;

        if (originalReq.url == "/refresh") {
            localStorage.removeItem("token");
            return Promise.reject(error);
        }
        if (error.response?.status == 401 &&
            error.response?.data?.code == "TOKEN_EXPIRED" &&
            !originalReq._retry) {
            originalReq._retry = true;
            try {
                const res = await api.post("/refresh"); 
                const newToken = res.data.token;
                console.log("Session Refreshed");
                localStorage.setItem("token", newToken);
                originalReq.headers.Authorization = `Bearer ${newToken}`
                return api(originalReq)
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);

    })

export { api }

