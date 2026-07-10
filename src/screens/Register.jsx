import { useState } from "react";
import { register } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [role, setRole] = useState("");
    const [fullName, setFullName] = useState("");
        const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const signUp = async () => {
        try {
            const res = await register(email, pass, role, fullName);
            console.log('Server response:', res.data);
            alert(res.data.message);
            navigate("/login")

        } catch (err) {
            alert(err);
            console.log(err);
        }
    }
    return (
        <>
            <section className="max-w-7xl min-h-screen h-full mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-gray-200">
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
                        {/* fullName */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                type="text"
                                required
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Password */}
                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                                type={showPass ? "text" : "password"}
                                required
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(prev => !prev)}
                                className="absolute right-3 top-12 -translate-y-1/2">
                                {showPass ? <EyeOff color="#4A4A4A" size={20} /> : <Eye color="#4A4A4A" size={20} />}
                            </button>
                        </div>
                        {/* Role  */}
                        <div className="w-full mx-auto max-w-2xl">
                            <h4 className="text-gray-700 font-medium mb-1">Select Your Role</h4>

                            <div className="rounded-lg border py-2 px-4">
                                <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={role === "admin"}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    />
                                    <span className="pl-2">Admin</span>
                                </label>

                                <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === "user"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <span className="pl-2">User</span>
                                </label>
                            </div>
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

export default Register;
