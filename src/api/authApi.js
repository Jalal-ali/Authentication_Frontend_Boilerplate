const baseUrl = import.meta.env.VITE_API_URL ;
import axios from "axios";

const login = async (email , password) => {
     const res = await axios.post(`${baseUrl}/login`, {
                email, 
                password 
            });
            return res ;
}
 export {login};