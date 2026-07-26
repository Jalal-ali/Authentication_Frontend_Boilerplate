const LoadingSpinner = () => {
  return (
    <div className="relative">
  <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
    <div className="flex items-center">
      <span className="text-3xl mr-4">Loading</span>
      <svg
        className="animate-spin h-8 w-8 text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx={12}
          cy={12}
          r={10}
          stroke="currentColor"
          strokeWidth={4}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
  {/* component */}
  <section className='bg-white"'>
    <div className="container px-4 mx-auto">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <a className="inline-block mx-auto mt-6" href="#">
            <img
              className="h-12"
              src="https://www.svgrepo.com/show/530661/genetic-data.svg"
              alt=""
            />
          </a>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Sign in</h2>
        </div>
        <form action="">
          <div className="mb-6">
            <label className="block mb-2 font-extrabold" htmlFor="">
              Email
            </label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="email"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-extrabold" htmlFor="">
              Password
            </label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="password"
              placeholder="**********"
            />
          </div>
          <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
            <div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
              <label htmlFor="">
                <input type="checkbox" />
                <span className="ml-1 font-extrabold">Remember me</span>
              </label>
            </div>
            <div className="w-full lg:w-auto px-4">
              <a
                className="inline-block font-extrabold hover:underline"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">
            Sign in
          </button>
          <p className="text-center font-extrabold">
            Don’t have an account?{" "}
            <a className="text-red-500 hover:underline" href="#">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  </section>
</div>

  )
}

export default LoadingSpinner
