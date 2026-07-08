import { useEffect, useState } from "react"
import { fetchAuthUser } from "../api/authApi";

const Profile = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetchAuthUser();
            console.log("Response:", res.data.user);
            setData(res.data.user);
           
        };
        loadUser();
    }, []);

  return (
    <>
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
          John Doe
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Email address</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.email}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">ID</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data._id}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Role</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.role}
        </dd>
      </div>
    </dl>
  </div>
</div>

    </>
  )
}

export default Profile
