// import {useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../api/authApi"
import LoadingSpinner from "../components/LoadingSpinner.jsx"
// import AuthContext from "../context/AuthContext.js";

const Users = () => {
  const {data, isLoading, error} = useQuery({
    queryKey:["users"],
    queryFn : async () =>{
      const res = await fetchUsers();
      return res.data.users
    },
    staleTime: 15 * 1000,
    retry : false,
  });
  // const [data, setData] = useState([]);
  // const [error, setError] = useState(null);
    // const auth = useContext(AuthContext);
  

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const res = await fetchUsers();
  //       setData(res.data.users);
  //     } catch (err) {
  //       setError(err);
  //       // console.log(err);

  //     }
  //   }
  //   getUsers();
  // }, []);
  if(error){
    return (
      <div className="flex py-4 text-center justify-center">
          <h1>Session expired login again.</h1>
          
        </div>
    )
  }
  if(isLoading){
    return <LoadingSpinner />
  }
  return (
    <>
      {error ?
        <div className="flex py-4 text-center justify-center">
          <h1>{error}</h1>
        </div>
        : (
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-indigo-600 text-white">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
          User
        </th>

        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
          Role
        </th>

        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
          Email
        </th>

        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 bg-white">
      {data?.map((value) => (
        <tr
          key={value._id}
          className="hover:bg-indigo-50 transition-colors duration-200 even:bg-gray-50"
        >
          <td className="px-6 py-4 whitespace-nowrap ">
            <div>
              <p className="font-semibold text-gray-800">{value.fullName}</p>
              <p className="text-sm text-gray-500">{value._id}</p>
            </div>
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-center">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full + ${value.role == "admin" ? `bg-green-100 text-green-700` : `bg-gray-200 text-gray-700` }`}>
              {value.role}
            </span>
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-center">
            {value.email}
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-center">
            <button
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        )}

    </>
  )
}

export default Users
