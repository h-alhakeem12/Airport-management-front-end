import "./App.css"
import "./Sidebar.css"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"

import Footer from "./components/Footer"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import StaffDashboard from "./pages/StaffDashboard"
import MyTasks from "./pages/MyTasks"
<<<<<<< HEAD
=======
import Flight from "./pages/FlightManager"
import StaffManager from "./pages/StaffManager"
>>>>>>> b0077b3a8c901ffaa90d4684a8701ac71c85ec20
import MyFlights from "./pages/MyFlights"
import FlightManager from "./pages/FlightManager"
import StaffManager from "./pages/StaffManager"
import TaskManager from "./pages/TaskManager"
import TerminalManager from "./pages/TerminalManger"
import AdminSidebar from "./components/AdminSidebar"
import StaffSidebar from "./components/StaffSidebar"

function App() {
  const location = useLocation()

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/"
  const isAdminPath =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/AdminDashboard"

  const isStaffPath =
    location.pathname.startsWith("/My") ||
    location.pathname === "/StaffDashboard"

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        {isAdminPath && <AdminSidebar />}
        {isStaffPath && <StaffSidebar />}

        <main
          style={{
            flex: 1,
            padding: "20px",
            marginLeft: isAdminPath || isStaffPath ? "280px" : "0px",
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/admin/staff" element={<StaffManager />} />
            <Route path="/admin/tasks" element={<TaskManager />} />
            <Route path="/admin/flights" element={<FlightManager />} />
            <Route path="/admin/terminal" element={<TerminalManager />} />

            <Route path="/StaffDashboard" element={<StaffDashboard />} />
            <Route path="/MyTasks" element={<MyTasks />} />
            <Route path="/MyFlights" element={<MyFlights />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
