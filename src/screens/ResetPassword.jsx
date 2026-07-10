import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    
    if (password !== confirmPass) {
      alert("Confirm password does not match.");
      return;
    }
    try{

      const res = await resetPassword(token, password);
      setSuccess(true);
      console.log(res.data);
    }
    catch(err){
      alert("error:" , err);
      console.log("error:" , err);
    }

  }
  return (
    <>
      {success ? (
        <div className="text-center py-6 bg-emerald-100 px-4 rounded-lg mx-4">
          <svg viewBox="0 0 24 24" className="justify-self-center rotate-10 text-green-600 w-8 h-8 sm:w-8 sm:h-8 mr-3 text-center">
            <path fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
          </svg>
          <h2 className="text-2xl font-bold text-green-600">
            Password Reset Successfully.
          </h2>

          <p className="text-gray-600 mt-2">
            Click Login button to login with your new password.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      ) : (
        <section className="max-w-7xl mx-auto min-h-screen h-full px-4 py-6 sm:px-6 lg:px-8 bg-gray-200">
          <div className="bg-white mx-auto shadow-lg rounded-2xl p-8 w-full max-w-md">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Reset Password
            </h2>
            <p className="text-gray-500 text-center mt-2">Reset your Password</p>
            {/* Form */}
            <form className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleReset();
              }}>
              {/* Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
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
              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
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
              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Reset
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default ResetPassword
