import { Link, useNavigate } from "react-router-dom"
import {
  LuUsers,
  LuLayoutDashboard,
  LuClipboardList,
  LuPlane,
  LuLogOut,
} from "react-icons/lu"
const AdminSidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div>
      <h3>Admin Panel</h3>
      <Link className="sidebar-link" to="/AdminDashboard">
        <LuLayoutDashboard /> Dashboard
      </Link>
      <Link className="sidebar-link" to="/admin/staff">
        <LuUsers /> Staff Manager
      </Link>
      <Link className="sidebar-link" to="/admin/tasks">
        <LuClipboardList /> Task Manager
      </Link>
      <Link className="sidebar-link" to="/flights">
        <LuPlane /> Flight Manager
      </Link>
      <button className="logout-button" onClick={handleLogout}>
        <LuLogOut /> Logout
      </button>
    </div>
  )
}

export default AdminSidebar
