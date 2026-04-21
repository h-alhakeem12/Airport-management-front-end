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

      <Link to="/StaffDashboard">Dashboard</Link>
      <br />
      <Link to="/MyTasks">My Tasks</Link>
      <br />
      <Link to="/MyFlights">My Flights</Link>
      <br />
      <br />

      <button onClick={handleLogout}>Sign Out</button>
    </div>
  )
}

export default StaffSidebar
