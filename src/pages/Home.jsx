import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      navigate("/login")
    }
  }, [navigate])
  if (!user) return <div>Loading...</div>

  return (
    <div>
      <div>
        <h1>Welcome to Aero</h1>

        {user.user.role === "admin" ? (
          <div className="admin-section">
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user.user.name}</p>
            {/*<FlightManager /> */}
          </div>
        ) : (
          <div className="staff-section">
            <h2>Staff Portal</h2>
            <p>Welcome, {user.user.name}</p>
            {/* <MyTasks /> */}
          </div>
        )}

        <button onClick={() => {
          localStorage.removeItem("user")
          navigate("/login")
        }}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Home
