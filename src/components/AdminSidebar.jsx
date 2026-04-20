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

      <Link to="/AdminDashboard">Dashboard</Link>
      <br />
      <Link to="/StaffManager">Staff Manager</Link>
      <br />
      <Link to="/TaskManager">Task Manager</Link>
      <br />
      <Link to="/FlightManager">Flight Manager</Link>
      <br /><br />

      <button onClick={handleLogout}>Sign Out</button>
    </div>
  )
}

export default AdminSidebar
