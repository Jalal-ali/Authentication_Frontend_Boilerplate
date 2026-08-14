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
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  {/* Header */}
  <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-xl font-semibold text-gray-900">Users</h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage and view all registered users.
      </p>
    </div>

    {/* <div className="rounded-lg bg-gray-50 px-4 py-2 text-sm text-gray-600">
      <span className="font-semibold text-gray-900">{totalUsers}</span>{" "}
      total users
    </div> */}
    {/* new count  */}
    <div className="w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
  <div className="flex items-center gap-4">
    {/* Icon */}
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
      <svg
        className="h-6 w-6 text-indigo-600"
        viewBox="0 0 28 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
          fill="currentColor"
        />
        <path
          d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
          fill="currentColor"
        />
        <path
          d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
          fill="currentColor"
        />
        <path
          d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
          fill="currentColor"
        />
        <path
          d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
          fill="currentColor"
        />
        <path
          d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
          fill="currentColor"
        />
      </svg>
    </div>

    {/* Number */}
    <div>
      <p className="text-sm font-medium text-gray-500">
        Total Users
      </p>

      <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
        {totalUsers?.toLocaleString() ?? 0}
      </h2>
    </div>
  </div>
</div>

  </div>

  {/* Table */}
  <div className="w-full overflow-x-auto">
    <table className="min-w-[800px] w-full">
      <thead className="border-b border-gray-200 bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            User
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Role
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Email
          </th>

          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {users?.map((user) => (
          <tr
            key={user._id}
            className="group transition-colors hover:bg-gray-50"
          >
            {/* User */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                  {user.fullName?.charAt(0)?.toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {user.fullName}
                  </p>

                  <p className="mt-0.5 max-w-[220px] truncate text-xs text-gray-400">
                    ID: {user._id}
                  </p>
                </div>
              </div>
            </td>

            {/* Role */}
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span
                  className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                    user.role === "admin"
                      ? "bg-emerald-500"
                      : "bg-gray-400"
                  }`}
                />
                {user.role}
              </span>
            </td>

            {/* Email */}
            <td className="px-6 py-4">
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 active:scale-95"
                >
                  View
                </button>

                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}

        {/* Empty state */}
        {users?.length === 0 && (
          <tr>
            <td colSpan="4" className="px-6 py-16 text-center">
              <div className="mx-auto max-w-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  ?
                </div>

                <p className="font-medium text-gray-900">
                  No users found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  There are no users available on this page.
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* pagination buttons */} 
  <div className="w-full border-t border-gray-200 font-mono mt-6"> 
    <nav className="pagination flex flex-wrap justify-center text-gray-700 -mt-px">
        <button type="button"
        disabled={page === 1} onClick={() => setPage((p) => p - 1)} 
        className="cursor-pointer p-2.5 border-t border-transparent hover:border-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-transparent"> 
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,-1,0,0)" > 
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <span onClick={() => setPage(1)}
        className={`${page === 1 ? "current border-black" : "border-transparent hover:border-gray-700"} cursor-pointer p-2 mx-1 text-gray-800 border-t`}>
        1
      </span>
      <span onClick={() => setPage(2)}
        className={`${page === 2 ? "current border-black" : "border-transparent hover:border-gray-700"} cursor-pointer p-2 mx-1 text-gray-800 border-t`}>
        2
      </span>
      <span className="p-2 mx-1">...</span>
      <span onClick={() => setPage(totalPages)}
        className={`${page === totalPages ? "current border-black" : "border-transparent hover:border-gray-700"} cursor-pointer p-2 mx-1 text-gray-800 border-t`}>
        {totalPages}
      </span>
      <button type="button" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="cursor-pointer p-2.5 border-t border-transparent hover:border-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-transparent">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </nav>
  </div>
  {/* pagination buttons ended */}
</div>
        )}

    </>
  )
}

export default Users
