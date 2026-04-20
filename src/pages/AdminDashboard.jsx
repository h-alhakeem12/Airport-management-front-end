import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global"
import AdminSidebar from "../components/AdminSidebar"
import { Link, useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    staff: 0,
    flights: 0,
    tasks: 0,
    terminals: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem("userRole")

    if (role !== "admin") {
      navigate("/login")
      return
    }

    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [s, f, t, term] = await Promise.all([
        axios.get(`${BASE_URL}staff`),
        axios.get(`${BASE_URL}flights`),
        axios.get(`${BASE_URL}tasks`),
        axios.get(`${BASE_URL}terminal`),
      ])

      setCounts({
        staff: s.data.length,
        flights: f.data.length,
        tasks: t.data.length,
        terminals: term.data.length,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <div>
          <h3>Total Staff: {counts.staff}</h3>
          <Link to="/admin/staff">
            <button>Manage</button>
          </Link>
        </div>

        <div>
          <h3>Total Flights: {counts.flights}</h3>
          <Link to="/admin/flights">
            <button>Manage</button>
          </Link>
        </div>

        <div>
          <h3>Total Tasks: {counts.tasks}</h3>
          <Link to="/admin/tasks">
            <button>Manage</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
