import { useState } from "react";
import { deleteUser } from "../api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Eye, EyeOff } from "lucide-react";

const DeleteUserModal = ({ modal, setModal, user }) => {
  const [loading, setLoading] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [showPass, setShowPass] = useState(false);
  // const [id, setId] = useState("");
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      })
      alert(data.message);
      setLoading(false);
      setModal(false)
    },
    onError: (err) => {
      alert("error:", err)
    }
  })
  const handleSubmit = async () => {
    deleteMutation.mutate({ id: user._id })
    // try {

    //   // const res = await deleteUser(id);
    //   // console.log(res.data);
    //   // setPassModal(false);
    //   // setSuccess(true);
    // }
    // catch (err) {
    //   console.log(err);
    //   alert(err);
    // }
    // finally {
    //   setLoading(false);
    // }
  }
  if (!modal) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md relative">
          {/* Close Button */}
          <button
            onClick={() => setModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
          >
            ✕
          </button>

          <h1 className="text-center text-2xl font-bold mb-6">
            Delete User
          </h1>

          <form onSubmit={(e) => {
            e.preventDefault();
            setLoading(true)
            handleSubmit();
          }}>
            <h1 className="text-center text-lg font-medium text-gray-700 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {user.fullName}
              </span>
              ?
            </h1>            {/* current Password  */}
            {/* <div className="mb-4 relative">
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
                  </div> */}
            {/* new password  */}
            {/* <div className="mb-4 relative">
              <label
                htmlFor="newPass"
                className="block text-gray-700 font-medium mb-2"
              >
                New Password
              </label>

              <input
                id="newPass"
                // onChange={(e) => {
                //   setId(e.target.value.trim());
                // }}
                type="text"
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
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${loading
                ? "bg-red-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
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
                  <span className='text-white'>Deleting...</span>
                </>
              ) : (
                "Delete User"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default DeleteUserModal
