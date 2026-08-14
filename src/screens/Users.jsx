import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../api/authApi"
import LoadingSpinner from "../components/LoadingSpinner.jsx"

const Users = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await fetchUsers(page);
      return res.data
    },
    placeholderData: keepPreviousData,
    staleTime: 25 * 1000,
    retry: false,
  });
  const {
    users,
    totalPages,
    totalUsers,
  } = data || {};

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
  if (error) {
    return (
      <div className="flex py-4 text-center justify-center">
        <h1>Session expired login again.</h1>

      </div>
    )
  }
  if (isLoading) {
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
            {totalUsers && <h1>Total Users: {totalUsers}</h1>}
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
                {users?.map((value) => (
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
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full + ${value.role == "admin" ? `bg-green-100 text-green-700` : `bg-gray-200 text-gray-700`}`}>
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
            <div className="w-full border-t border-gray-200 font-mono mt-16">
              <nav className="pagination flex flex-wrap justify-center text-gray-700 -mt-px">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="cursor-pointer p-2.5 border-t border-transparent hover:border-gray-700
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:border-transparent">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    transform="matrix(-1,0,0,-1,0,0)"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="cursor-pointer p-2 mx-1 current text-gray-800 border-t border-black">
                  1
                </span>
                <span
                  className="cursor-pointer p-2 mx-1 border-t border-transparent hover:border-gray-700"
                >
                  2
                </span>
                <span className="p-2 mx-1">...</span>
                <span
                  className="cursor-pointer p-2 mx-1 border-t border-transparent hover:border-gray-700"
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </span>
                <button
                type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="cursor-pointer p-2.5 border-t border-transparent hover:border-gray-700">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>

            {/* <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>

            <span>Page {page}</span>

            <button
              disabled={page === data?.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button> */}
          </div>
        )}

    </>
  )
}

export default Users
