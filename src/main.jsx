import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Users from './screens/Users.jsx'
import Login from './screens/Login.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path : "/",
        element : <App/>
      },
      {
        path : "/users",
        element : <Users/>
      },
      {
        path : "/login",
        element : <Login/>
      },


    ]
  }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
