import { useState } from "react";
import { register } from "../api/authApi";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [role, setRole] = useState("");
     const signUp = async () => {
        try{
            const res = await register(email, pass, role);
             console.log('Server response:', res.data);            
        }catch(err){
            alert(err);
            console.log(err);
        }
    }
  return (
      <>
            <section className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-gray-200">
                <div className="bg-white mx-auto shadow-lg rounded-2xl p-8 w-full max-w-md">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Get Started
                    </h2>
                    <p className="text-gray-500 text-center mt-2">Create your account</p>
                    {/* Form */}
                    <form className="mt-6 space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            signUp();
                        }}>
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Role  */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Role</label>
                            <div className="flex gap-1.5 my-2">
                            <button type="button" onClick={() => {
                                setRole("admin");
                                console.log(role);
                                
                                }} className="w-full py-2 border border-transparent font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700">
                                Admin
                            </button>
                            <button type="button" onClick={() => {
                                setRole("user");
                                console.log(role);
                            }} className="w-full border border-transparent font-semibold rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200">
                                User
                            </button>
                            </div>
                            {/* <input
                                onChange={(e) => {
                                    setRole(e.target.value);
                                }}
                                type="password"
                                placeholder="Enter your role"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            /> */}
                        </div>
                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Create
                        </button>
                        {/* Divider */}
                        {/* <div className="flex items-center gap-3 my-4">
                            <hr className="flex-1 border-gray-300" />
                            <span className="text-gray-400 text-sm">OR</span>
                            <hr className="flex-1 border-gray-300" />
                        </div> */}
                    </form>
                    {/* Register Link */}
                    <p className="text-center text-gray-600 text-sm mt-6">
                        Already an account?
                        <Link
                            to="/login"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        </>
  )
}

export default Register ;
