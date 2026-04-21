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
      <Link className="sidebar-link" to="/StaffDashboard"><LuLayoutDashboard /> Dashboard</Link>
      <Link className="sidebar-link" to="/MyTasks"><LuClipboardList /> My Tasks</Link>
      <Link className="sidebar-link" to="/MyFlights"><LuPlane /> My Flights</Link>
      <button className="logout-button" onClick={handleLogout}><LuLogOut /> Sign Out</button>
      <button className="logout-button" onClick={handleLogout}><LuLogOut /> Sign Out</button>

    </div>
  )
}
export default StaffSidebar
