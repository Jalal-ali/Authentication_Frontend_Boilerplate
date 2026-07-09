import { useState } from "react";
import { login } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassModal from "../components/ForgotPassModal";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const [showForgotModal, setShowForgotModal] = useState(false);


    // const getVals = () => {
    //     console.log("email:", email);
    //     console.log("password:", pass);
    // }
    const signIn = async () => {
        try {
            const res = await login(email, pass);
            console.log('Server response:', res.data);
            console.log('Token:', res.data.token);
            localStorage.setItem("token", res.data.token);
            alert(res.data.message);
            console.log('Server status:', res.status);
            navigate("/users")

        } catch (err) {
            alert(err);
            console.log(err);
        }
    }

    return (
        <>
            {showForgotModal && (
                <ForgotPassModal
                    showForgotModal={showForgotModal}
                    setShowForgotModal={setShowForgotModal}
                />
            )}

            <section className="max-w-7xl mx-auto min-h-screen h-full px-4 py-6 sm:px-6 lg:px-8 bg-gray-200">
                <div className="bg-white mx-auto shadow-lg rounded-2xl p-8 w-full max-w-md">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 text-center mt-2">Login to your account</p>
                    {/* Form */}
                    <form className="mt-6 space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            signIn();
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
                        {/* forgot pass  */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowForgotModal(true)}
                                className="text-sm text-blue-600 hover:underline cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Login
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
                        Don't have an account?
                        <Link
                            to="/register"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
                {/* forgot password modal  */}
            </section>
        </>

    )
}

export default Login
