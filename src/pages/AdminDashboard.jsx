import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global"
import AdminSidebar from "../components/AdminSidebar"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const [staffCount, setStaffCount] = useState(0)
  const [flightsCount, setFlightsCount] = useState(0)
  const [tasksCount, setTasksCount] = useState(0)
  const [terminalsCount, setTerminalsCount] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      navigate("/login")
    }

    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const staff = await axios.get(`${BASE_URL}staff`)
      const flights = await axios.get(`${BASE_URL}flights`)
      const tasks = await axios.get(`${BASE_URL}tasks`)
      const terminals = await axios.get(`${BASE_URL}terminal`)

      setStaffCount(staff.data.length)
      setFlightsCount(flights.data.length)
      setTasksCount(tasks.data.length)
      setTerminalsCount(terminals.data.length)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div >
      <AdminSidebar />
      <div>
        <h1>Admin Dashboard</h1>

        <div>
          <h3>Total Staff: {staffCount}</h3>
          <h3>Total Flights: {flightsCount}</h3>
          <h3>Total Tasks: {tasksCount}</h3>
          <h3>Active Terminals: {terminalsCount}</h3>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard
