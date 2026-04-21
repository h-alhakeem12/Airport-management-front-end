import { Link, useNavigate } from "react-router-dom"
import {
  LuUsers,
  LuLayoutDashboard,
  LuClipboardList,
  LuPlane,
  LuLogOut,
  LuTerminal,
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
<<<<<<< HEAD
      <Link className="sidebar-link" to="/AdminDashboard">
        <LuLayoutDashboard /> Dashboard
      </Link>
      <Link className="sidebar-link" to="/admin/staff">
        <LuUsers /> Staff Manager
      </Link>
      <Link className="sidebar-link" to="/admin/tasks">
        <LuClipboardList /> Task Manager
      </Link>
      <Link className="sidebar-link" to="admin/flights">
        <LuPlane /> Flight Manager
      </Link>
      <Link className="sidebar-link" to="admin/terminal">
        <LuTerminal /> Terminal Manager
      </Link>
      <button className="logout-button" onClick={handleLogout}>
        <LuLogOut /> Logout
      </button>
=======
      <Link className="sidebar-link" to="/AdminDashboard">Dashboard</Link>
      <Link className="sidebar-link" to="/admin/staff"> Staff Manager</Link>
      <Link className="sidebar-link" to="/admin/tasks"> Task Manager</Link>
      <Link className="sidebar-link" to="/admin/flights"> Flight Manager</Link>
      <button className="logout-button" onClick={handleLogout}> Sign Out</button>
>>>>>>> b0077b3a8c901ffaa90d4684a8701ac71c85ec20
    </div>
  )
}

export default AdminSidebar
