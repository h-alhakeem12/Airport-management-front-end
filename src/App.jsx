import "./App.css"
import "./Sidebar.css"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import StaffManage from "./pages/StaffManage"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import StaffDashboard from "./pages/StaffDashboard"
import MyTasks from "./pages/MyTasks"
import MyFlights from "./pages/MyFlights"
import FlightManager from "./pages/FlightManager"
import StaffManager from "./pages/StaffManager"
import TaskManager from "./pages/TaskManager"
import AdminSidebar from "./components/AdminSidebar"
import StaffSidebar from "./components/StaffSidebar"

function App() {
  const location = useLocation()

  const isLoginPage = location.pathname === "/login" || location.pathname === "/"
  const isAdminPath =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/AdminDashboard"

  const isStaffPath =
    location.pathname.startsWith("/My") ||
    location.pathname === "/StaffDashboard"

  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/staff-manage" element={<StaffManage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
