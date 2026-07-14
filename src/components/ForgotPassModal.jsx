import { useState} from 'react'
import { forgotPassword } from '../api/authApi';

const ForgotPassModal = ({ showForgotModal, setShowForgotModal }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            console.log("submitting...");
            const res = await forgotPassword(email);
            console.log(res.data);
            setSuccess(true);
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
        finally {
            setLoading(false);
        }

    }
    if (!showForgotModal) return null;

    return (
        <>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {success ? (
                <div className="text-center py-6 bg-emerald-100 px-4 rounded-lg mx-4">
                    {/* <div className="text-5xl mb-4 rounded-full">✅</div> */}
                    <svg viewBox="0 0 24 24" className="justify-self-center rotate-10 text-green-600 w-8 h-8 sm:w-8 sm:h-8 mr-3 text-center">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>

                    <h2 className="text-2xl font-bold text-green-600">
                        Email Sent!
                    </h2>

                    <p className="text-gray-600 mt-2">
                        If an account exists with this email address, we've sent a password reset link.
                        Please check your inbox and spam folder.
                    </p>

                    <button
                        onClick={() => setShowForgotModal(false)}
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            ) : (
  
                <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md relative">
                    {/* Close Button */}
                    <button
                        onClick={() => setShowForgotModal(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
                    >
                        ✕
                    </button>

                    <h1 className="text-center text-2xl font-bold mb-6">
                        Forgot Password
                    </h1>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true)
                        handleSubmit();
                    }}>
                        <div className="mb-4">
                            <label
                                htmlFor="forgotEmail"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="forgotEmail"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                                required
                                placeholder="Enter your email address"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${loading
                                ? "bg-blue-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <span className='text-white'>Sending reset link...</span>
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                </div>
)}
            </div>

            

        </>
    )
}

export default ForgotPassModal
