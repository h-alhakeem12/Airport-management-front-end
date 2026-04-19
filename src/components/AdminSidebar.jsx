import { Link, useNavigate } from "react-router-dom"

const AdminSidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div>
      <h3>Admin Panel</h3>
      <nav>
        <Link to="/AdminDashboard">Dashboard</Link>
        <Link to="/StaffManager">Staff Manager</Link>
        <Link to="/TaskManager">Task Manager</Link>
        <Link to="/FlightManager">Flight Manager</Link>
      </nav>
      <button onClick={handleLogout} className="signOutBtn">Sign Out</button>
    </div>
  )
}

export default AdminSidebar
