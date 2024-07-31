import { Outlet, useLocation } from "react-router-dom"
import Dashboard from "./Dashboard"
import Header from "./Header"
import { ToastContainer } from 'react-toastify'

const Root = () => {
  const location = useLocation()

  return (
    <div>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div id="main">
        {location.pathname === "/" ? <Dashboard /> : <Outlet />}
      </div>
    </div>
  )
}

export default Root