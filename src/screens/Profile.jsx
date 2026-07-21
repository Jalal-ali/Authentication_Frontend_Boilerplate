import { useContext, useState } from "react"
import { changePassword } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthContext from '../context/AuthContext.js'
const Profile = () => {
  const navigate = useNavigate();
  const [passModal, setPassModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const {token, user, userLoading, logout} = useContext(AuthContext);

  // change pass handling 
  const handleSubmit = async () => {
    try{
      const res = await changePassword(newPass,currentPass);
      console.log(res.data);
      setPassModal(false);
      setSuccess(true);
    }
    catch(err){
      console.log(err);
      alert(err);
    }
    finally{
      setLoading(false);
    }    
  }

  return (
    <>
      {/* -----------change password modal start -------------------  */}
      {passModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setPassModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
            >
              ✕
            </button>

            <h1 className="text-center text-2xl font-bold mb-6">
              Change Password
            </h1>

            <form onSubmit={(e) => {
              e.preventDefault();
              setLoading(true)
              handleSubmit();
            }}>
              {/* current Password  */}
              <div className="mb-4 relative">
                <label
                  htmlFor="currentPass"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Current Password
                </label>

                <input
                  id="currentPass"
                  onChange={(e) => {
                    setCurrentPass(e.target.value);
                  }}
                   type={showPass ? "text" : "password"}
                  required
                  placeholder="Enter your current password"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(prev => !prev)}
                  className="absolute right-3 top-13 -translate-y-1/2">
                  {showPass ? <EyeOff color="#4A4A4A" size={20} /> : <Eye color="#4A4A4A" size={20} />}
                </button>
              </div>
              {/* new password  */}
              <div className="mb-4 relative">
                <label
                  htmlFor="newPass"
                  className="block text-gray-700 font-medium mb-2"
                >
                  New Password
                </label>

                <input
                  id="newPass"
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                   type={showPass ? "text" : "password"}
                  required
                  placeholder="Enter your new password"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 <button
                  type="button"
                  onClick={() => setShowPass(prev => !prev)}
                  className="absolute right-3 top-13 -translate-y-1/2">
                  {showPass ? <EyeOff color="#4A4A4A" size={20} /> : <Eye color="#4A4A4A" size={20} />}
                </button>
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
                    <span className='text-white'>Updating...</span>
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* -----------change password modal end -------------------  */}

      {/* ----------- success modal start -------------------  */}
      {success && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
            Click Login button to login again with your new password or <br /> Close to stay logged in.
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="cursor-pointer mt-6 w-full bg-gray-500 hover:bg-gray-700 text-white py-2 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login")}}
            className="cursor-pointer mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Login Again
          </button>
        </div>
         </div>
      ) }
      {/* ----------- success modal start -------------------  */}


      {/* ----------- Profile section start -------------------  */}

          {token ? (
      <div className="bg-white overflow-hidden  px-2">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
        </div>
        <div className="border-2 border-slate-300 px-4 py-5 sm:p-0 rounded-lg">
            <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userLoading ? "Loading" : user.fullName  }
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userLoading ? "Loading" : user.email  }
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* {user._id} */}
                {userLoading ? "Loading" : user._id  }
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* {user.role} */}
                {userLoading ? "Loading" : user.role  }
              </dd>
            </div>
          </dl>
           </div>
        <button
          type="button"
          onClick={() => setPassModal(prev => !prev)}
          className="cursor-pointer border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline">
          Change Password
        </button>
      </div>
          ) : (
            <div className="flex py-4 text-center justify-center">
          <h1>Unauthorized</h1>
        </div>
          )}
          
       
      {/* ----------- Profile section end -------------------  */}


    </>
  )
}

export default Profile
