import { Link, useNavigate } from "react-router-dom"
import "../Sidebar.css"
import { LuLayoutDashboard, LuUsers, LuClipboardList, LuPlane, LuLogOut } from "react-icons/lu"

const AdminSidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="sidebar-container">
      <h3>Admin Panel</h3>
      <Link className="sidebar-link" to="/AdminDashboard"><LuLayoutDashboard /> Dashboard</Link>
      <Link className="sidebar-link" to="/admin/staff"><LuUsers /> Staff Manager</Link>
      <Link className="sidebar-link" to="/admin/tasks"><LuClipboardList /> Task Manager</Link>
      <Link className="sidebar-link" to="/admin/flights"><LuPlane /> Flight Manager</Link>
      <button className="logout-button" onClick={handleLogout}><LuLogOut />  Sign Out</button>
      <button className="logout-button" onClick={handleLogout}><LuLogOut /> Sign Out</button>

    </div>
  )
}
export default AdminSidebar
 