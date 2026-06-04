import { useEffect, useState } from "react";
import { fetchUsers } from "../api/authApi"

const Users = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetchUsers();
        console.log(res.data.users);
        setData(res.data.users);
      } catch (err) {
        alert(err);
        setError(err);
        console.log(err);

      }
    }
    getUsers();
  }, [])
  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);
  return (
    <>
      {error ?
        <div className="flex py-4 text-center justify-center">
          <h1>{error}</h1>
        </div>
        : (
          <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
            <thead className="bg-gray-500/20">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">{value._id}</div>
                          <div className="text-sm text-gray-500">{value.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {value.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {value.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                      <a href="#" className="ml-2 text-red-600 hover:text-red-900">
                        Delete
                      </a>
                    </td>
                  </tr>
                )
              })
              }

              {/* More rows... */}
            </tbody>
          </table>
        )}

    </>
  )
}

export default Users
