import { Link, useNavigate } from "react-router-dom"
import "../Sidebar.css"
import { LuLayoutDashboard, LuClipboardList, LuPlane, LuLogOut } from "react-icons/lu"

const StaffSidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="sidebar-container">
      <h3>Staff Panel</h3>
      <Link className="sidebar-link" to="/StaffDashboard">Dashboard</Link>
      <Link className="sidebar-link" to="/MyTasks">My Tasks</Link>
      <Link className="sidebar-link" to="/MyFlights"> My Flights</Link>
      <button className="logout-button" onClick={handleLogout}> Sign Out</button>
    </div>
  )
}
export default StaffSidebar
