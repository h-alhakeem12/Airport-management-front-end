import { Link, useNavigate } from "react-router-dom"

const StaffSidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div>
      <h3>Staff Panel</h3>
      <nav>
        <Link to="/StaffDashboard">Dashboard</Link>
        <Link to="/MyTasks">My Tasks</Link>
        <Link to="/MyFlights">My Flights</Link>
      </nav>
      <button onClick={handleLogout} className="signOutBtn">Sign Out</button>
    </div>
  )
}

export default StaffSidebar
